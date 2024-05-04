import NewPasswordForm from "@/components/auth/forms/new-password-form";
import { redirect } from "next/navigation";

interface NewPasswordPageProps {
  searchParams?: {
    token?: string;
  };
}

const NewPasswordPage = ({ searchParams }: NewPasswordPageProps) => {
  const { token } = searchParams || {};

  console.log(token);

  if (!token) {
    return redirect("/not-found");
  }

  return (
    <div>
      <NewPasswordForm token={token} />
    </div>
  );
};

export default NewPasswordPage;
