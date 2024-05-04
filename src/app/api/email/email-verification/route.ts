import { Resend } from "resend";
import EmailVerificationCode from "@/components/email/verification-code";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { email, code } = await request.json();

    const data = await resend.emails.send({
      from: "no-reply@blazar.lol",
      to: [email],
      subject: "Verification Code",
      react: EmailVerificationCode({ code }),
      text: "Email body text",
    });

    return Response.json(data);
  } catch (error) {
    return Response.json({ error });
  }
}
