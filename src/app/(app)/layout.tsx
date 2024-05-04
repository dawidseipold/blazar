import { validateSession } from "@/utils/auth/session";
import { signOut } from "@/utils/auth/sign";
import { redirect } from "next/navigation";

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout = async ({ children }: AppLayoutProps) => {
  const { user } = await validateSession();

  if (!user) {
    return redirect("/auth/signin");
  }

  return (
    <div>
      <form action={signOut}>
        <button>Sign Out</button>
      </form>

      {children}
    </div>
  );
};

export default AppLayout;
