"use server";

import { loadEnvConfig } from "@next/env";
import { cwd } from "process";

loadEnvConfig(cwd());

export const sendVerificationCode = async (email: string, code: string) => {
  try {
    await fetch(
      `${process.env.NEXT_PUBLIC_DOMAIN}/api/email/email-verification`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, code }),
      }
    );
  } catch (error) {
    console.error(error);
  }
};

export const sendPasswordResetToken = async (email: string, link: string) => {
  try {
    await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/email/password-reset`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, link }),
    });
  } catch (error) {
    console.error(error);
  }
};
