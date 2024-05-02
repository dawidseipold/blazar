import AuthCard from "@/components/auth/auth-card";
import SignInForm from "@/components/auth/forms/signin-form";
import { SignIn } from "@/components/signin-button";
import { signIn } from "@/lib/auth";
import { db, test } from "@/lib/drizzle";
import { users } from "@/lib/drizzle/schema";
import { and, eq } from "drizzle-orm";

const SignInPage = () => {
  return (
    <div className="flex flex-col gap-y-4">
      <div>{test}</div>

      <AuthCard.Root>
        <AuthCard.Header>
          <AuthCard.Title>Welcome back!</AuthCard.Title>
          <AuthCard.Description>Sign in to your account</AuthCard.Description>
        </AuthCard.Header>

        <AuthCard.Content>
          <SignInForm />
        </AuthCard.Content>
      </AuthCard.Root>

      <AuthCard.Footer>
        <div className="flex gap-x-1">
          Dont't have an account?
          <AuthCard.Link href="/auth/signup">Sign up</AuthCard.Link>
        </div>
      </AuthCard.Footer>
    </div>
  );
};

export default SignInPage;
