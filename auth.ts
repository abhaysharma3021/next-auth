import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";

import authConfig from "./auth.config";
import { db } from "./lib/db";
import { getUserById } from "./data/user";
import { getTwoFactorConfirmationByUserId } from "./data/two-factor-confirmation";

export const { auth, handlers, signIn, signOut } = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      // Allow OAuth without email verification
      if (account?.provider !== "credentials") return true;

      const existingUser = await getUserById(user.id as string);

      // Prevent sign in without email verification
      if (!existingUser?.emailVerified) return false;

      // TODO: Add 2FA check
      if (existingUser.isTwoFactorEnabled) {
        const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(
          existingUser.id
        );
        if (!twoFactorConfirmation) return false;

        // Delete two factor confirmation for next sign-in
        await db.twoFactorConfirmation.delete({
          where: { id: twoFactorConfirmation.id },
        });
      }

      return true;
    },
    async jwt({ token }) {
      if (!token.sub) return token;
      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;
      token.role = existingUser.role;
      return token;
    },
    async session({ session, user, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      if (token.role && session.user) {
        session.user.role = token.role;
      }
      return session;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
