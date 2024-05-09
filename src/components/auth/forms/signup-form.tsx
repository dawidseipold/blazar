"use client";

import { signUp } from "@/utils/sign";
import { Field, Form } from "houseform";
import { useRef } from "react";

const SignUpForm = () => {
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <Form>
      {({ isValid, submit }) => (
        <form
          ref={formRef}
          action={signUp}
          onSubmit={(e) => {
            e.preventDefault();
            submit().then((isValid) => {
              if (!isValid) return;

              if (formRef.current) {
                formRef.current.submit();
              }
            });
          }}
        >
          <Field name="email">
            {({ value, setValue, onBlur, errors }) => (
              <div>
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  placeholder="Email"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  onBlur={onBlur}
                />
                {errors.map((error) => (
                  <div key={error}>{error}</div>
                ))}
              </div>
            )}
          </Field>

          <Field name="password">
            {({ value, setValue, onBlur, errors }) => (
              <div>
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  name="password"
                  placeholder="Password"
                  type="password"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  onBlur={onBlur}
                />
                {errors.map((error) => (
                  <div key={error}>{error}</div>
                ))}
              </div>
            )}
          </Field>

          <button type="submit" disabled={!isValid}>
            Sign Up
          </button>
        </form>
      )}
    </Form>
  );
};

export default SignUpForm;
