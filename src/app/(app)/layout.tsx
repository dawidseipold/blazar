import { getAccountDetails, getAccountUsername } from "@/utils/account";
import { validateSession } from "@/utils/session";
import { signOut } from "@/utils/sign";
import { redirect } from "next/navigation";

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout = async ({ children }: AppLayoutProps) => {
  const { user } = await validateSession();

  if (!user) {
    return redirect("/auth/signin");
  }

  const account = await getAccountDetails(user.id);

  if (!account) {
    return redirect("/onboarding/account-details");
  }

  return (
    <div className="bg-base-100">
      <p>{account.username}</p>

      <form action={signOut}>
        <button>Sign Out</button>
      </form>

      {children}
    </div>
  );
};

export default AppLayout;
