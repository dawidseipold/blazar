"use server";

import { db } from "@/lib/drizzle";
import { users } from "@/lib/drizzle/schema";

export const getUsers = async () => {
  const result = await db.select().from(users);

  return result;
};
