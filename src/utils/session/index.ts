import { lucia } from "@/lib/lucia";
import { type User, type Session } from "lucia";
import { cookies } from "next/headers";
import { cache } from "react";

export const createSessionCookie = (sessionId?: string) => {
  let sessionCookie;

  if (sessionId) {
    sessionCookie = lucia.createSessionCookie(sessionId);
  } else {
    sessionCookie = lucia.createBlankSessionCookie();
  }

  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
};

export const createSession = async (userId: string) => {
  const session = await lucia.createSession(userId, {});
  createSessionCookie(session.id);
};

export const validateSession = cache(
  async (): Promise<
    { user: User; session: Session } | { user: null; session: null }
  > => {
    const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;

    if (!sessionId) {
      return { user: null, session: null };
    }

    const result = await lucia.validateSession(sessionId);

    // If the session is fresh, create a new session cookie, otherwise create a blank session cookie
    try {
      if (result.session && result.session.fresh) {
        createSessionCookie(result.session.id);
      }

      if (!result.session) {
        createSessionCookie();
      }
    } catch {}

    return result;
  }
);
