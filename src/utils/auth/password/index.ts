"use server";

import { db } from "@/lib/drizzle";
import { passwordResetTokenTable } from "@/lib/drizzle/schema";
import { eq } from "drizzle-orm";

// import { hash, verify } from "@node-rs/argon2";

import { isWithinExpirationDate } from "oslo";
import { sha256 } from "oslo/crypto";
import { encodeHex } from "oslo/encoding";

import { lucia } from "@/lib/lucia";
import { redirect } from "next/navigation";

import { updatePasswordHash } from "./db";
import { removePasswordResetTokens } from "../password-reset-token/db";
import { PASSWORD_HASH_OPTIONS } from "@/constants/hash";

export const generatePasswordHash = async (password: string) => {
  return await Bun.password.hash(password, PASSWORD_HASH_OPTIONS);
};

export const createNewPasswordHash = async (
  verificationToken: any,
  formData: FormData
) => {
  let password = String(formData.get("new-password"));

  // Generate a sha-256 hash of the verification token
  const tokenHash = encodeHex(
    await sha256(new TextEncoder().encode(verificationToken))
  );

  // Check if the generated token exists and is not expired
  // TODO: Create a function that selects a token by hash
  const token = (
    await db
      .select()
      .from(passwordResetTokenTable)
      .where(eq(passwordResetTokenTable.tokenHash, tokenHash))
  )[0];

  if (!token || !isWithinExpirationDate(token.expiresAt)) {
    throw new Error("Invalid token");
  }

  // Update the password hash in the database
  if (token.userId) {
    const passwordHash = await generatePasswordHash(password);

    await removePasswordResetTokens(token.userId);
    await lucia.invalidateSession(token.userId);
    await updatePasswordHash(token.userId, passwordHash);
  }

  return redirect("/auth/signin");
};

// UTILITY
export const verifyPasswordHash = async (hash: string, password: string) => {
  return await Bun.password.verify(password, hash);
};
