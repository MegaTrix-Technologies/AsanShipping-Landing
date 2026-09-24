import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const targetUrl = new URL(process.env.NEXT_PUBLIC_APP_LOGIN_URL || "https://web.asanshipping.com/login");
  searchParams.forEach((value, key) => targetUrl.searchParams.set(key, value));
  return NextResponse.redirect(targetUrl);
}
