interface PasswordResetLinkProps {
  link: string;
}

const PasswordResetLink: React.FC<Readonly<PasswordResetLinkProps>> = ({
  link,
}) => {
  return <a href={link}>Click here to reset your password!</a>;
};

export default PasswordResetLink;
