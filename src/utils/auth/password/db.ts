"use server";

import { db } from "@/lib/drizzle";
import { eq } from "drizzle-orm";

import { userTable } from "@/lib/drizzle/schema";

// UPDATE
export const updatePasswordHash = async (
  userId: string,
  passwordHash: string
) => {
  return await db
    .update(userTable)
    .set({
      passwordHash: passwordHash,
    })
    .where(eq(userTable.id, userId));
};
