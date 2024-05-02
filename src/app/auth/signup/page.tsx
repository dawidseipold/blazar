import AuthCard from "@/components/auth/auth-card";
import SignUpForm from "@/components/auth/forms/signup-form";
import { createUser } from "@/utils/db/actions/users";
import { SignUpSchema } from "@/lib/valibot/schema/auth";
import { hashAndSaltPassword } from "@/utils/auth";

const SingUpPage = () => {
  return (
    <div>
      <AuthCard.Root>
        <AuthCard.Header>
          <AuthCard.Title>Sign up</AuthCard.Title>
          <AuthCard.Description>Create an account</AuthCard.Description>
        </AuthCard.Header>

        <AuthCard.Content>
          <SignUpForm />
        </AuthCard.Content>
      </AuthCard.Root>

      <AuthCard.Footer>
        <div className="flex gap-x-1">
          Already have an account?
          <AuthCard.Link href="/auth/signin">Sign in</AuthCard.Link>
        </div>
      </AuthCard.Footer>
    </div>
  );
};

export default SingUpPage;
