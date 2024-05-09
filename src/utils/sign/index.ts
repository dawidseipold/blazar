"use server";

import { generateIdFromEntropySize } from "lucia";
import { lucia } from "@/lib/lucia";
import { redirect } from "next/navigation";

import { sendVerificationCode } from "@/utils/email";
import { getCreatedEmailVerificationCode } from "../email-verification";
import { createUser, getUserByEmail } from "../user/db";
import { generatePasswordHash, verifyPasswordHash } from "../password";
import {
  createSession,
  createSessionCookie,
  validateSession,
} from "../session";

// Add additional input validation to signUp and signIn functions
export const signUp = async (formData: FormData) => {
  const password = String(formData.get("password"));
  const email = String(formData.get("email"));

  const passwordHash = await generatePasswordHash(password);
  // TODO: Upon creation of account the id hash is generated based on the provided email/username - still to be determined
  const userId = generateIdFromEntropySize(16);
  const verificationCode = await getCreatedEmailVerificationCode(userId, email);

  await sendVerificationCode(email, verificationCode);
  await createUser({ id: userId, email, passwordHash });

  await createSession(userId);

  return redirect("/auth/verify");
};

export const signIn = async (formData: FormData) => {
  const email = String(formData.get("email"));
  const password = String(formData.get("password"));

  const existingUser = await getUserByEmail(email);

  if (existingUser === null) {
    throw new Error("Invalid credentials");
  }

  const validPassword = await verifyPasswordHash(
    existingUser.passwordHash!,
    password
  );

  if (!validPassword) {
    throw new Error("Invalid credentials");
  }

  await createSession(existingUser.id);

  return redirect("/");
};

export const signOut = async () => {
  const { session } = await validateSession();

  if (!session) {
    throw new Error("Unauthorized");
  }

  await lucia.invalidateSession(session.id);

  createSessionCookie();

  return redirect("/auth/signin");
};
