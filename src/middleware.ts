import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const guestId = request.cookies.get("guestId");

  const response = NextResponse.next();

  if (!guestId) {
    response.cookies.set({
      name: "guestId",
      value: crypto.randomUUID(),
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
    });
  }

  return response;
}
