import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = async ({ children }: AuthLayoutProps) => {
  const session = await auth();

  if (session) {
    return redirect("/");
  }

  return (
    <main
      className="p-8 flex justify-center items-center h-screen"
      style={{
        backgroundImage: "url('/background.png')",
      }}
    >
      <div className="flex flex-col gap-y-4 max-w-96 items-center">
        {/* <Logo /> */} <div>Logo</div>
        {children}
      </div>
    </main>
  );
};

export default AuthLayout;
