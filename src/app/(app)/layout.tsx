import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout = async ({ children }: AppLayoutProps) => {
  const session = await auth();

  if (!session) {
    redirect("/auth/signin");
  }

  return <div>{children}</div>;
};

export default AppLayout;
