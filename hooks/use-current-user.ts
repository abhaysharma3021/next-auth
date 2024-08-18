import { useSession, getSession } from "next-auth/react";

export const useCurrentUser = async () => {
  const session = await getSession();

  return session?.user;
};
