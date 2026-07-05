import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";
import { SESSION_COOKIE } from "@/lib/session";

function secretKey() {
  return new TextEncoder().encode(process.env.SESSION_SECRET);
}

export async function proxy(request: NextRequest) {
  const token = request.cookies.get(SESSION_COOKIE)?.value;
  let authenticated = false;

  if (token) {
    try {
      await jwtVerify(token, secretKey());
      authenticated = true;
    } catch {
      authenticated = false;
    }
  }

  const { pathname } = request.nextUrl;
  const isLoginPage = pathname === "/admin/login";

  if (!authenticated && !isLoginPage) {
    const url = new URL("/admin/login", request.url);
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  if (authenticated && isLoginPage) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
