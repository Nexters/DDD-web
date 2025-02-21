import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const token = cookies().get("guestId")?.value;
  return NextResponse.json({ token });
}
