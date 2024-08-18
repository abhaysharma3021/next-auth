import { useSession, getSession } from "next-auth/react";

export const CurrentUser = async () => {
  const session = await getSession();

  return session?.user;
};
