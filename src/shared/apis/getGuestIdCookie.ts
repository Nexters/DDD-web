export const getGuestIdCookie = async () => {
  const userKey: { token: string | undefined } = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/cookies`
  ).then((res) => res.json());
  return userKey.token;
};
