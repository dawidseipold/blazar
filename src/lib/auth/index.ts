import NextAuth, { type User } from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "../drizzle";
import Resend from "next-auth/providers/resend";
import Credentials from "next-auth/providers/credentials";
import { getUser } from "@/utils/db/actions/users";
import { type SignInSchema } from "../valibot/schema/auth";
import { UserSelect, users } from "../drizzle/schema";
import { hashAndSaltPassword, verifyPassword } from "@/utils/auth";
import { and, eq } from "drizzle-orm";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DrizzleAdapter(db),
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials): Promise<SignInSchema | null> => {
        try {
          const { email, password } = credentials as SignInSchema;

          const user = await getUser(email);

          if (!user) {
            return null;
          }

          return {
            email: user.email,
            password: user.password,
          };
        } catch (error) {
          console.error(error);
          return null;
        }
      },
    }),
    // Resend({
    //   from: "no-reply@blazar.lol",
    //   secret: process.env.AUTH_EMAIL_SECRET,
    // }),
  ],
  basePath: "/api/auth",
  pages: {
    // signIn: "/auth/signin",
  },
});
