import nodemailer from "nodemailer";

const email = process.env.GOOGLE_SMTP_EMAIL;
const pass = process.env.GOOGLE_SMTP_APP_PASSWORD;

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: email,
    pass,
  },
});
