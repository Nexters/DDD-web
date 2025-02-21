export const getGuestIdCookie = async () => {
  console.log(process.env.NEXT_PUBLIC_BASE_URL);
  const userKey: { token: string | undefined } = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/cookies`
  ).then((res) => res.json());
  return userKey.token;
};
