"use server";

import { db } from "@/lib/drizzle";
import { eq } from "drizzle-orm";
import { accountTable } from "@/lib/drizzle/schema";

interface Avatar {
  url: string;
  alt: string;
}

interface AccountDetails {
  userId: string;
  username: string;
  avatar?: Avatar | null;
}

// CREATE
export const createAccountDetails = async ({
  userId,
  username,
  avatar = null,
}: AccountDetails) => {
  return await db.insert(accountTable).values({
    userId,
    username,
    avatar: JSON.stringify(avatar),
  });
};

// READ
export const getAccountDetails = async (userId: string) => {
  const result = await db
    .select({
      username: accountTable.username,
      avatar: accountTable.avatar,
    })
    .from(accountTable)
    .where(eq(accountTable.userId, userId));

  if (result.length === 0) {
    return null;
  }

  return result[0];
};

export const getAccountUsername = async (userId: string) => {
  const result = await db
    .select({
      username: accountTable.username,
    })
    .from(accountTable)
    .where(eq(accountTable.userId, userId));

  if (result.length === 0) {
    return null;
  }

  return result[0].username;
};

// UPDATE
export const updateAccountUsername = async (
  username: string,
  userId: string
) => {
  return await db
    .update(accountTable)
    .set({ username })
    .where(eq(accountTable.userId, userId));
};
