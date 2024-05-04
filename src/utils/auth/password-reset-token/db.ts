"use server";

import { db } from "@/lib/drizzle";
import { eq } from "drizzle-orm";
import { passwordResetTokenTable } from "@/lib/drizzle/schema";

// CREATE
export const createPasswordResetToken = async (
  userId: string,
  tokenHash: string,
  expiresAt: Date
) => {
  return await db.insert(passwordResetTokenTable).values({
    userId,
    tokenHash,
    expiresAt,
  });
};

// DELETE
export const removePasswordResetTokens = async (userId: string) => {
  return await db
    .delete(passwordResetTokenTable)
    .where(eq(passwordResetTokenTable.userId, userId));
};
