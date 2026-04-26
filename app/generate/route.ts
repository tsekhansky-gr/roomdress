import { Ratelimit } from "@upstash/ratelimit";
import redis from "../../utils/redis";
import { NextResponse } from "next/server";
import { headers } from "next/headers";

// Rate limiter: 5 requests per 24 hours
const ratelimit = redis
  ? new Ratelimit({
      redis: redis,
      limiter: Ratelimit.fixedWindow(5, "1440 m"),
      analytics: true,
    })
  : undefined;

export async function POST(request: Request) {
  // Rate Limiter Code
  if (ratelimit) {
    const headersList = headers();
    const ipIdentifier = headersList.get("x-real-ip");
    const result = await ratelimit.limit(ipIdentifier ?? "");

    if (!result.success) {
      return new Response(
        "Too many uploads in 1 day. Please try again in 24 hours.",
        {
          status: 429,
          headers: {
            "X-RateLimit-Limit": result.limit,
            "X-RateLimit-Remaining": result.remaining,
          } as any,
        }
      );
    }
  }

  const { imageUrl, theme, room } = await request.json();

  // Build the prompt for GenAPI
  const prompt =
    room === "Gaming Room"
      ? "a room for gaming with gaming computers, gaming consoles, and gaming chairs, photo from Pinterest, interior, cinematic photo, ultra-detailed, ultra-realistic, award-winning"
      : `a ${theme.toLowerCase()} ${room.toLowerCase()}, photo from Pinterest, interior, cinematic photo, ultra-detailed, ultra-realistic, award-winning`;

  const negative_prompt =
    "longbody, lowres, bad anatomy, bad hands, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality";

  // Step 1: Send the generation request to GenAPI
  const startResponse = await fetch(
    "https://api.gen-api.ru/api/v1/networks/restyle",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + process.env.GENAPI_API_KEY,
      },
      body: JSON.stringify({
        callback_url: null,
        image: imageUrl,
        prompt: prompt,
        negative_prompt: negative_prompt,
      }),
    }
  );

  const jsonStartResponse = await startResponse.json();
  const requestId = jsonStartResponse.request_id;

  if (!requestId) {
    return NextResponse.json(
      "Failed to start generation: " + JSON.stringify(jsonStartResponse)
    );
  }

  // Step 2: Poll for the result
  let restoredImage: string | null = null;
  let attempts = 0;
  const maxAttempts = 180; // wait up to 3 minutes (180 seconds)

  while (!restoredImage && attempts < maxAttempts) {
    console.log("polling for result, attempt " + attempts);

    const finalResponse = await fetch(
      "https://api.gen-api.ru/api/v1/request/get/" + requestId,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + process.env.GENAPI_API_KEY,
        },
      }
    );

    const jsonFinalResponse = await finalResponse.json();

    if (jsonFinalResponse.status === "success") {
      // result is an array of image URLs, take the first one
      restoredImage = Array.isArray(jsonFinalResponse.result)
        ? jsonFinalResponse.result[0]
        : jsonFinalResponse.result;
    } else if (jsonFinalResponse.status === "error") {
      break;
    } else {
      // status is "starting" or "processing", wait 1 second and try again
      await new Promise((resolve) => setTimeout(resolve, 1000));
      attempts++;
    }
  }

  return NextResponse.json(
    restoredImage ? restoredImage : "Failed to restore image"
  );
}
