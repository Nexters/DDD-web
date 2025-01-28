"use server";

import { cookies } from "next/headers";

export const createUserKeyCookie = () => {
  const userKey = crypto.randomUUID();
  if (cookies().get("userKey")) {
    return cookies().get("userKey")?.value;
  }
  cookies().set("userKey", userKey, {
    path: "/",
    httpOnly: true,
    secure: true,
    maxAge: 60 * 60 * 24 * 365,
    /**
     * TODO: 백엔드 서버와 도메인을 통합한 후 설정값 변경
     */
    sameSite: "none",
  });

  return userKey;
};
