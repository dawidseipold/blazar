"use server";

import { type User } from "lucia";
import { TimeSpan, createDate, isWithinExpirationDate } from "oslo";
import { alphabet, generateRandomString } from "oslo/crypto";

import {
  createEmailVerificationCode,
  getEmailVerificationCode,
  removeEmailVerficationCode,
} from "./db";

export const getCreatedEmailVerificationCode = async (
  userId: string,
  email: string
) => {
  // Remove any existing email verification codes
  removeEmailVerficationCode(userId);

  // Generate a new email verification code
  const code = generateRandomString(8, alphabet("0-9"));

  // Create a new email verification code in the database
  await createEmailVerificationCode(
    userId,
    email,
    code,
    createDate(new TimeSpan(15, "m"))
  );

  return code;
};

export const validateEmailVerificationCode = async (
  user: User,
  code: string
): Promise<boolean> => {
  const databaseCode = await getEmailVerificationCode(user.id);

  // Ensure the code exists in the database
  if (!databaseCode || databaseCode.code !== code) {
    return false;
  }

  // Remove the email verification code from the database
  await removeEmailVerficationCode(user.id);

  // Ensure the code is within the expiration date
  if (!isWithinExpirationDate(databaseCode.expiresAt)) {
    return false;
  }

  // Ensure the user ID matches the user ID in the database
  if (databaseCode.userId !== user.id) {
    return false;
  }

  return true;
};
