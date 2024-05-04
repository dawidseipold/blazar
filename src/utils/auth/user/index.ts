"use server";

import { lucia } from "@/lib/lucia";
import { validateEmailVerificationCode } from "../email-verification";
import { validateSession } from "../session";
import { redirect } from "next/navigation";
import { changeEmailVerification } from "../email-verification/db";

export const verifyUser = async (formData: FormData) => {
  // TODO: Replace with a searchParam token from the URL (sent in email)
  const { user } = await validateSession();

  if (!user) {
    throw new Error("Unauthorized. Regenerate verification code.");
  }

  const code = formData.get("code") as string;

  if (typeof code !== "string") {
    throw new Error("Invalid code");
  }

  const validCode = await validateEmailVerificationCode(user, code);

  if (!validCode) {
    throw new Error("Invalid code");
  }

  await lucia.invalidateSession(user.id);

  await changeEmailVerification(user.id, true);

  return redirect("/auth/signin");
};
