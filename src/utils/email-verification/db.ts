"use server";

import { eq } from "drizzle-orm";
import { db } from "@/lib/drizzle";

import { emailVerificationTable, userTable } from "@/lib/drizzle/schema";

// CREATE
export const createEmailVerificationCode = async (
  userId: string,
  email: string,
  code: string,
  expiresAt: Date
) => {
  return await db.insert(emailVerificationTable).values({
    userId,
    email,
    code,
    expiresAt,
  });
};

// READ
export const getEmailVerificationCode = async (userId: string) => {
  const result = await db
    .select({
      userId: emailVerificationTable.userId,
      code: emailVerificationTable.code,
      expiresAt: emailVerificationTable.expiresAt,
    })
    .from(emailVerificationTable)
    .where(eq(emailVerificationTable.userId, userId));

  if (result.length === 0) {
    return null;
  }

  return result[0];
};

// DELETE
export const removeEmailVerficationCode = async (userId: string) => {
  return await db
    .delete(emailVerificationTable)
    .where(eq(emailVerificationTable.userId, userId));
};

export const changeEmailVerification = async (
  userId: string,
  value: boolean
) => {
  return await db
    .update(userTable)
    .set({
      emailVerified: value,
    })
    .where(eq(userTable.id, userId));
};
