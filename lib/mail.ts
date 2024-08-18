import { transporter } from "@/config/nodemail";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const baseUrl = process.env.NEXT_PUBLIC_URL || "http://localhost:3000";

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${baseUrl}/auth/new-verification?token=${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Confirm your email",
    html: `<p><a href="${confirmLink}">Click here</a> to confirm email.</p>`,
  });
};

export const sendVerificationEmailByGoogle = async (
  email: string,
  token: string
) => {
  const confirmLink = `${baseUrl}/auth/new-verification?token=${token}`;

  try {
    await transporter.sendMail({
      from: "abhaysharma11400@gmail.com",
      to: email,
      subject: "Confirm your email",
      html: `<p><a href="${confirmLink}">Click here</a> to confirm email.</p>`,
    });
  } catch {
    return { error: "Email not sent!" };
  }
};

export const sendPasswordResetEmailByGoogle = async (
  email: string,
  token: string
) => {
  const confirmLink = `${baseUrl}/auth/new-password?token=${token}`;

  try {
    await transporter.sendMail({
      from: "abhaysharma11400@gmail.com",
      to: email,
      subject: "Reset your email password",
      html: `<p><a href="${confirmLink}">Click here</a> to reset your email password.</p>`,
    });
  } catch {
    return { error: "Email not sent!" };
  }
};

export const sendTwoFactorEmailByGoogle = async (
  email: string,
  token: string
) => {
  await transporter.sendMail({
    from: "abhaysharma11400@gmail.com",
    to: email,
    subject: "2FA Code",
    html: `<p>Your 2FA code:${token}</p>`,
  });
};
