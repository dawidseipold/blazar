import { Resend } from "resend";
import PasswordResetLink from "@/components/email/password-reset-link";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { email, link } = await request.json();

    const data = await resend.emails.send({
      from: "no-reply@blazar.lol",
      to: [email],
      subject: "Reset Password",
      react: PasswordResetLink({ link }),
      text: "Email body text",
    });

    return Response.json(data);
  } catch (error) {
    return Response.json({ error });
  }
}
