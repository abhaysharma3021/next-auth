import { UserRole } from "@prisma/client";
import NextAuth, { type DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

export type ExtendedUser = DefaultSession["user"] & {
  role: UserRole;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
  interface JWT {
    /** Role */
    role?: UserRole;
  }
}
