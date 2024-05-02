"use client";

import {
  createUser,
  getEmailAvailability,
  getUsernameAvailability,
  getUsers,
} from "@/utils/db/actions/users";
import { auth, handlers } from "@/lib/auth";
import { hashAndSaltPassword } from "@/utils/auth";
import { useMutation } from "@tanstack/react-query";
import { Form, Field } from "houseform";
import { redirect, useRouter } from "next/navigation";
import { z } from "zod";

const SignUpForm = () => {
  const router = useRouter();

  const mutation = useMutation({
    mutationKey: ["create-user"],
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      await createUser(email, password);
    },
  });

  return (
    <Form
      onSubmit={async (values) => {
        mutation.mutate({ email: values.email, password: values.password });
      }}
    >
      {({ isValid, submit }) => (
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            await submit();
            // await handlers
            router.push("/auth/verify");
          }}
        >
          {/* TODO: Move to a different view on the first login of the user */}
          {/* <Field<string>
            name="username"
            onChangeValidate={z
              .string()
              .min(3, "Must be at least 3 characters")}
            onSubmitValidate={async (value) => {
              return new Promise<boolean>(async (resolve, reject) => {
                const isUnique = await getUsernameAvailability(value);

                if (isUnique) {
                  resolve(true);
                } else {
                  reject("That username is already taken");
                }
              });
            }}
          >
            {({ value, setValue, onBlur, errors }) => {
              return (
                <div>
                  <input
                    className="text-black"
                    value={value}
                    onBlur={onBlur}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="Username"
                  />
                  {errors.map((error) => (
                    <p key={error}>{error}</p>
                  ))}
                </div>
              );
            }}
          </Field> */}

          <Field<string>
            name="email"
            onBlurValidate={z.string().email("Invalid email address.")}
            onSubmitValidate={async (value) => {
              return new Promise<boolean>(async (resolve, reject) => {
                const isUnique = await getEmailAvailability(value);

                if (isUnique) {
                  resolve(true);
                } else {
                  reject("That email is already taken");
                }
              });
            }}
          >
            {({ value, setValue, onBlur, errors }) => (
              <div>
                <input
                  className="text-black"
                  type="text"
                  value={value}
                  onBlur={onBlur}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder="Email"
                />
                {errors.map((error) => (
                  <div key={error}>{error}</div>
                ))}
              </div>
            )}
          </Field>

          <Field<string>
            name="password"
            onBlurValidate={z
              .string()
              .min(8, "Must be at least 8 characters long")
              .regex(
                /(?=.*[a-z])/,
                "Must contain at least one lowercase letter"
              )
              .regex(
                /(?=.*[A-Z])/,
                "Must contain at least one uppercase letter"
              )
              .regex(/(?=.*[0-9])/, "Must contain at least one number")}
          >
            {({ value, setValue, onBlur, errors }) => {
              return (
                <div>
                  <input
                    className="text-black"
                    value={value}
                    onBlur={onBlur}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder={"Password"}
                    type="password"
                  />
                  {errors.map((error) => (
                    <p key={error}>{error}</p>
                  ))}
                </div>
              );
            }}
          </Field>
          <Field<string>
            name="confirmpassword"
            listenTo={["password"]}
            onChangeValidate={(val, form) => {
              if (val === form.getFieldValue("password")?.value) {
                return Promise.resolve(true);
              } else {
                return Promise.reject("Passwords must match");
              }
            }}
          >
            {({ value, setValue, onBlur, errors, isTouched }) => {
              return (
                <div>
                  <input
                    className="text-black"
                    value={value}
                    onBlur={onBlur}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder={"Password Confirmation"}
                    type="password"
                  />
                  {isTouched &&
                    errors.map((error) => <p key={error}>{error}</p>)}
                </div>
              );
            }}
          </Field>

          <button disabled={!isValid} type="submit">
            Sign Up
          </button>
        </form>
      )}
    </Form>
  );
};

export default SignUpForm;
