"use server";

import { cookies } from "next/headers";

export const createUserKeyCookie = () => {
  const uuid = crypto.randomUUID();
  if (cookies().get("guestId")) {
    return cookies().get("guestId")?.value;
  }
  cookies().set("guestId", uuid, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
  });

  return uuid;
};
