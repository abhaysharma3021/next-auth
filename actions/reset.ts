"use server";

import { signIn } from "@/auth";
import { getUserByEmail } from "@/data/user";
import {
  sendPasswordResetEmailByGoogle,
  sendVerificationEmailByGoogle,
} from "@/lib/mail";
import {
  generatePasswordResetToken,
  generateVerificationToken,
} from "@/lib/tokens";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { ResetSchema } from "@/schemas";
import { AuthError } from "next-auth";
import * as z from "zod";

export const reset = async (values: z.infer<typeof ResetSchema>) => {
  const validateFields = ResetSchema.safeParse(values);

  if (!validateFields.success) {
    return { error: "Invalid Fields!" };
  }

  const { email } = validateFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    return { error: "Email not found!" };
  }

  // TODO: Generate token and send email
  var passwordResetToken = await generatePasswordResetToken(existingUser.email);
  await sendPasswordResetEmailByGoogle(
    passwordResetToken.email,
    passwordResetToken.token
  );

  return { success: "Reset email sent!" };
};
