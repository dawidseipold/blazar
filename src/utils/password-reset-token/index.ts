"use server";

import { TimeSpan, generateIdFromEntropySize } from "lucia";
import { createPasswordResetToken, removePasswordResetTokens } from "./db";
import { encodeHex } from "oslo/encoding";
import { sha256 } from "oslo/crypto";
import { createDate } from "oslo";
import { getUserByEmail } from "../user/db";
import { sendPasswordResetToken } from "@/utils/email";

import { loadEnvConfig } from "@next/env";
import { cwd } from "process";

loadEnvConfig(cwd());

export const getCreatedPasswordResetToken = async (
  userId: string
): Promise<string> => {
  await removePasswordResetTokens(userId);

  // Generate a new sha-256 password reset token
  const tokenId = generateIdFromEntropySize(25);
  const tokenHash = encodeHex(await sha256(new TextEncoder().encode(tokenId)));

  // Create a new password reset token in the database
  await createPasswordResetToken(
    userId,
    tokenHash,
    // TODO: Fix the wrong expiration date (problem with new TimeSpan)
    createDate(new TimeSpan(1, "d"))
  );

  return tokenId;
};

export const createPasswordChangeRequest = async (formData: FormData) => {
  let email = String(formData.get("email"));

  const user = await getUserByEmail(email);

  if (!user) {
    throw new Error("Invalid email");
  }

  const verificationToken = await getCreatedPasswordResetToken(user.id);
  const verificationLink = `${process.env.NEXT_PUBLIC_DOMAIN}/auth/new-password?token=${verificationToken}`;

  await sendPasswordResetToken(email, verificationLink);

  // REFERENCE: Make sure that most of the time, the function returns a response when possible
  return new Response("Password reset link sent", { status: 200 });
};
