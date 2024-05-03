"use client";

import { signIn } from "next-auth/react";
import {
  checkCredentials,
  checkEmailVerification,
  getEmailAvailability,
} from "@/utils/db/actions/users";
import { useMutation } from "@tanstack/react-query";
import { Field, Form } from "houseform";
import { z } from "zod";
import { useEffect, useState } from "react";

interface Error {
  message: string;
}

const SignInForm = () => {
  const [signInError, setSignInError] = useState<Error | null>(null);

  const mutation = useMutation({
    mutationKey: ["sign-in"],
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      const isUser = await checkCredentials(email, password);

      if (!isUser) {
        setSignInError({ message: "Invalid credentials" });
        return;
      }

      const isVerified = await checkEmailVerification(email);

      if (!isVerified) {
        setSignInError({ message: "Account is not verified" });
        return;
      }

      setSignInError(null);

      await signIn("credentials", {
        email: email,
        password: password,
      });
    },
  });

  return (
    <Form
      onSubmit={async (values) => {
        mutation.mutate({
          email: values.email,
          password: values.password,
        });
      }}
    >
      {({ isValid, submit, reset, isSubmitted }) => (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submit();
          }}
        >
          <Field<string>
            name="email"
            onBlurValidate={z.string().min(1, "Email is required.")}
          >
            {({ value, setValue, onBlur, errors }) => (
              <div>
                <input
                  className="text-black"
                  value={value}
                  onBlur={onBlur}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder="Email"
                />
                {errors.map((error) => (
                  <div key={error} className="text-red-500">
                    {error}
                  </div>
                ))}
              </div>
            )}
          </Field>

          <Field<string>
            name="password"
            onBlurValidate={z.string().min(1, "Password is required")}
          >
            {({ value, setValue, onBlur, errors }) => (
              <div>
                <input
                  className="text-black"
                  value={value}
                  onBlur={onBlur}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder="Password"
                  type="password"
                />
                {errors.map((error) => (
                  <div key={error} className="text-red-500">
                    {error}
                  </div>
                ))}
              </div>
            )}
          </Field>

          <button
            className="bg-blue-500 py-2 rounded-2xl"
            type="submit"
            disabled={!isValid}
          >
            Sign in
          </button>

          {signInError && (
            <div className="text-red-500">{signInError.message}</div>
          )}
        </form>
      )}
    </Form>
  );
};

export default SignInForm;
