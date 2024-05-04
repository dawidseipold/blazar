interface EmailVerificationCodeProps {
  code: string;
}

const EmailVerificationCode: React.FC<Readonly<EmailVerificationCodeProps>> = ({
  code,
}) => {
  return <div>{code}</div>;
};

export default EmailVerificationCode;
