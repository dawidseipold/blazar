import {
  Input,
  email,
  minLength,
  object,
  objectAsync,
  regex,
  string,
  stringAsync,
} from "valibot";

export const signInSchema = objectAsync({
  email: stringAsync("Your email must be a string.", [
    minLength(1, "Please enter your email."),
    email("The email is invalid."),
  ]),
  password: stringAsync("Your password must be a string.", [
    minLength(1, "Please enter your password."),
  ]),
});

export type SignInSchema = Input<typeof signInSchema>;

export const signUpSchema = object({
  email: string("Your email must be a string.", [
    minLength(1, "Please enter your email."),
    email("The email is invalid."),
  ]),
  password: string("Your password must be a string.", [
    minLength(1, "Please enter your password."),
    minLength(8, "Your password must be at least 8 characters long."),
    regex(
      /(?=.*[a-z])/,
      "Your password must contain at least one lowercase letter"
    ),
    regex(
      /(?=.*[A-Z])/,
      "Your password must contain at least one uppercase letter"
    ),
    regex(/(?=.*[0-9])/, "Your password must contain at least one number"),
  ]),
});

export type SignUpSchema = Input<typeof signUpSchema>;
