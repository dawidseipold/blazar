import { validateSession } from "@/utils/session";
import { redirect } from "next/navigation";

interface OnboardingLayoutProps {
  children: React.ReactNode;
}

const OnboardingLayout = async ({ children }: OnboardingLayoutProps) => {
  const { user } = await validateSession();

  if (!user) {
    return redirect("/auth/signin");
  }

  return (
    <div>
      <h1>{children}</h1>
    </div>
  );
};

export default OnboardingLayout;
