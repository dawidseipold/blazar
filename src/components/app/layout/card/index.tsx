interface CardRootProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  title: string;
}

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

const Card = ({ children }: CardRootProps) => {
  return (
    <div className="card card-compact bg-base-200 text-primary-content ">
      {children}
    </div>
  );
};

const CardHeader = ({ children, title }: CardHeaderProps) => {
  return (
    <header className="flex justify-between items-center">
      <h4 className="card-title pb-2">{title}</h4>
      {children}
    </header>
  );
};

const CardContent = ({ children }: CardContentProps) => {
  return <main className="card-body">{children}</main>;
};

const CardFooter = ({ children }: CardFooterProps) => {
  return <footer className="card-actions">{children}</footer>;
};

Card.Root = Card;
Card.Header = CardHeader;
Card.Content = CardContent;
Card.Footer = CardFooter;

export default Card;
