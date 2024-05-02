import NextAuth from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "../drizzle";
import Resend from "next-auth/providers/resend";
import Credentials from "next-auth/providers/credentials";
import { hashAndSaltPassword } from "@/utils/auth";
import {
  checkCredentials,
  checkEmailVerification,
  getUser,
  getUserCredentials,
} from "@/utils/db/actions/users";
import { UserSelect } from "../drizzle/schema";
import { type SignInSchema, signInSchema } from "../valibot/schema/auth";
import { ValiError, safeParseAsync } from "valibot";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DrizzleAdapter(db),
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials): Promise<SignInSchema | null> => {
        const { email, password } = credentials as SignInSchema;

        return await getUser(email);
      },
    }),
    Resend({
      from: "no-reply@blazar.lol",
      secret: process.env.AUTH_EMAIL_SECRET,
    }),
  ],
  basePath: "/api/auth",
  pages: {
    signIn: "/auth/signin",
  },
});
