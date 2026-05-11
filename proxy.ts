import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decryptForProxy } from "@/app/lib/session-proxy";

const protectedRoutes = ["/dashboard"];
const publicRoutes = ["/auth/login", "/"];

export async function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtected = protectedRoutes.some((r) => path.startsWith(r));
  const isPublic = publicRoutes.includes(path);

  const cookie = req.cookies.get("session")?.value;
  const session = await decryptForProxy(cookie);

  if (isProtected && !session?.userId) {
    return NextResponse.redirect(new URL("/auth/login", req.nextUrl));
  }

  if (isPublic && session?.userId && !path.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
