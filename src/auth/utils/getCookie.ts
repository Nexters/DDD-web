export async function getCookie(name: string) {
  if (typeof window === "undefined") {
    return await import("next/headers").then(({ cookies }) => {
      return cookies().get(name)?.value;
    });
  }

  return document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`))
    ?.split("=")[1];
}
