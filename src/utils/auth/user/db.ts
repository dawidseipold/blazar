"use server";

import { db } from "@/lib/drizzle";
import { UserInsertSchema, userTable } from "@/lib/drizzle/schema";
import { eq } from "drizzle-orm";

// CREATE
export const createUser = async ({
  id,
  email,
  passwordHash,
}: UserInsertSchema) => {
  return await db.insert(userTable).values({
    id: id,
    email: email,
    passwordHash: passwordHash,
  });
};

// READ
export const getUserByEmail = async (email: string) => {
  const result = await db
    .select({
      id: userTable.id,
      email: userTable.email,
      passwordHash: userTable.passwordHash,
    })
    .from(userTable)
    .where(eq(userTable.email, email));

  if (result.length === 0) {
    return null;
  }

  return result[0];
};
