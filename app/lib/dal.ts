import "server-only";
import { cache } from "react";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { decrypt } from "./session";

export const verifySession = cache(async () => {
  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);

  if (!session?.userId) {
    redirect("/auth/login");
  }

  return { isAuth: true, userId: session.userId as string };
});
