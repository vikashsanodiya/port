import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "./lib/auth";

export async function middleware(request: NextRequest) {
  const authToken = request.cookies.get("adminToken")?.value;
  
  if (!authToken) {
    return handleUnauthorizedResponse(request);
  }

  const { error } = await verifyToken(authToken, process.env.ACCESS_SECRET_KEY!);
  
  if (error) {
    return handleUnauthorizedResponse(request);
  }
  
  if (request.nextUrl.pathname.startsWith("/login")) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }
  
  return NextResponse.next();
}

function handleUnauthorizedResponse(request: NextRequest) {
  if (
    request.nextUrl.pathname.startsWith("/api/projects/cud") ||
    request.nextUrl.pathname.startsWith("/api/skills/cud") ||
    request.nextUrl.pathname.startsWith("/api/contact/rd")
  ) {
    return NextResponse.json(
      { message: "User is not authorized", success: false },
      { status: 401 }
    );
  }
  
  if (request.nextUrl.pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/api/projects/cud/:path*",
    "/api/skills/cud/:path*",
    "/api/contact/rd/:path*",
    "/admin/:path*",
    "/login",
  ],
};
