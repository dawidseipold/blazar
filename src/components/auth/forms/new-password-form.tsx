"use client";

import { createNewPasswordHash } from "@/utils/auth/password";
import { Field, Form } from "houseform";
import { useRef } from "react";
import { useFormState } from "react-dom";

interface NewPasswordFormProps {
  token?: string;
}

const NewPasswordForm = ({ token }: NewPasswordFormProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [_, formAction] = useFormState(createNewPasswordHash, token);

  return (
    <Form>
      {({ isValid, submit }) => (
        <form
          ref={formRef}
          action={formAction}
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
          <Field name="new-password">
            {({ value, setValue, onBlur, errors }) => (
              <div>
                <label htmlFor="new-password">New Password</label>
                <input
                  id="new-password"
                  name="new-password"
                  placeholder="New Password"
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

          <Field
            name="confirm-new-password"
            listenTo={["new-password"]}
            onChangeValidate={(val, form) => {
              if (val === form.getFieldValue("new-password")?.value) {
                return Promise.resolve(true);
              } else {
                return Promise.reject("Passwords must match");
              }
            }}
          >
            {({ value, setValue, onBlur, errors }) => (
              <div>
                <label htmlFor="confirm-new-password">
                  Confirm New Password
                </label>
                <input
                  id="confirm-new-password"
                  name="confirm-new-password"
                  placeholder="Confirm New Password"
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
            Reset Password
          </button>
        </form>
      )}
    </Form>
  );
};

export default NewPasswordForm;
