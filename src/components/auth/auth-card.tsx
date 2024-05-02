import Link from "next/link";
import React from "react";

interface AuthCardRootProps {
  children: React.ReactNode;
}

interface AuthCardHeaderProps {
  children: React.ReactNode;
}

interface AuthCardTitleProps {
  children: React.ReactNode;
}

interface AuthCardDescriptionProps {
  children: React.ReactNode;
}

interface AuthCardContentProps {
  children: React.ReactNode;
}

interface AuthCardFooterProps {
  children: React.ReactNode;
}

interface AuthCardLinkProps {
  children: React.ReactNode;
  href: string;
}

const AuthCard = ({ children }: AuthCardRootProps) => {
  return (
    <div className="p-8 rounded-3xl bg-gray-950 flex flex-col gap-y-4">
      {children}
    </div>
  );
};

AuthCard.Root = AuthCard;
AuthCard.Header = ({ children }: AuthCardHeaderProps) => (
  <div className="flex flex-col gap-y-2 mb-2">{children}</div>
);
AuthCard.Title = ({ children }: AuthCardTitleProps) => (
  <h1 className="text-2xl font-bold">{children}</h1>
);
AuthCard.Description = ({ children }: AuthCardDescriptionProps) => (
  <p className="text-sm font-medium text-gray-500">{children}</p>
);
AuthCard.Content = ({ children }: AuthCardContentProps) => (
  <main className="flex flex-col gap-y-4">{children}</main>
);
AuthCard.Footer = ({ children }: AuthCardFooterProps) => (
  <div className="flex flex-col gap-y-2 items-center">{children}</div>
);
AuthCard.Link = ({ children, href }: AuthCardLinkProps) => (
  <Link className="text-blue-500" href={href}>
    {children}
  </Link>
);

export default AuthCard;
