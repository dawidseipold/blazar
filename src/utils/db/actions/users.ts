"use server";

import { db } from "@/lib/drizzle";
import { users } from "@/lib/drizzle/schema";
import { hashAndSaltPassword, verifyPassword } from "@/utils/auth";
import { and, eq } from "drizzle-orm";

// GET

export const getUsers = async () => {
  const result = await db.select().from(users);

  return result;
};

export const getUser = async (email: string) => {
  const result = await db.select().from(users).where(eq(users.email, email));

  return result[0];
};

export const getUserCredentials = async (
  email: string,
  hashedPassword: string
) => {
  const result = await db
    .select({
      email: users.email,
      password: users.password,
    })
    .from(users)
    .where(and(eq(users.email, email), eq(users.password, hashedPassword)));

  return result[0];
};

export const getUsernameAvailability = async (username: string) => {
  const result = await db.select().from(users).where(eq(users.name, username));

  return result.length == 0;
};

export const getEmailAvailability = async (email: string) => {
  const result = await db.select().from(users).where(eq(users.email, email));

  return result.length == 0;
};

export const checkCredentials = async (email: string, password: string) => {
  const result = await db.select().from(users).where(eq(users.email, email));

  if (result.length === 0) {
    return false;
  }

  const passwordVerified = await verifyPassword(result[0].password, password);

  if (!passwordVerified) {
    return false;
  }

  return true;
};

export const checkEmailVerification = async (email: string) => {
  const result = await db
    .select({
      emailVerified: users.emailVerified,
    })
    .from(users)
    .where(eq(users.email, email));

  if (result[0].emailVerified === null) {
    return false;
  }

  return true;
};

// POST

export const createUser = async (email: string, password: string) => {
  const passwordHash = await hashAndSaltPassword(password);

  return db.insert(users).values({
    email: email,
    password: passwordHash,
  });
};
