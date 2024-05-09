import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";
import { sessionTable, userTable } from "@/lib/drizzle/schema";
import { db } from "@/lib/drizzle";
import { Lucia } from "lucia";

interface DatabaseUserAttributes {
  username: string;
  email: string;
  emailVerified: boolean;
}

const adapter = new DrizzlePostgreSQLAdapter(db, sessionTable, userTable);

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    expires: false,
    attributes: {
      secure: process.env.NODE_ENV === "production",
    },
  },
  getUserAttributes: (attributes) => {
    const { username, email, emailVerified } =
      attributes as DatabaseUserAttributes;

    return {
      username: username,
      email: email,
      name: emailVerified,
    };
  },
});

declare module "lucia" {
  interface Lucia {
    Lucia: typeof lucia;
  }

  interface User {
    id: string;
    emailVerified: boolean;
  }
}
