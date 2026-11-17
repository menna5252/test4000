import { getToken } from "next-auth/jwt";
import { NextResponse, type NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  const cookieName = process.env.NODE_ENV === "development" ? "next-auth.session-token" : "__Secure-next-auth.session-token";
  const token = await getToken({ req: request, secret: process.env.AUTH_SECRET ,
cookieName
  });

  const { pathname } = request.nextUrl;
  const isAuthPage = pathname === "/login" || pathname === "/register";

  if (!token && !isAuthPage) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  return NextResponse.next();
  // /profile
}

export const config = {
  matcher: ["/", "/profile", "/login", "/register"],
};