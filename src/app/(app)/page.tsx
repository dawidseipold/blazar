import { pgTable, text } from "drizzle-orm/pg-core";
import { db } from "../../lib/drizzle";
import { users } from "@/lib/drizzle/schema";
import { signIn } from "@/lib/auth";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getUsers } from "@/utils/db/actions/users";
import { SignIn } from "@/components/signin-button";
import { hashAndSaltPassword, verifyPassword } from "@/utils/auth";
import { safeParseAsync } from "valibot";
import { signInSchema } from "@/lib/valibot/schema/auth";

const Home = async () => {
  const test = await hashAndSaltPassword("password");
  const verify = await verifyPassword(test, "password");

  const result = await safeParseAsync(signInSchema, {
    email: "test@test.com",
    password: "password",
  });

  return (
    <div>
      <div>{test}</div>

      {verify && <div>verified</div>}

      {result.success && <pre>{JSON.stringify(result.output)}</pre>}
      <pre>
        {result.issues?.map((issue) => (
          <div>{issue.message}</div>
        ))}
      </pre>
    </div>
  );
};

export default Home;
