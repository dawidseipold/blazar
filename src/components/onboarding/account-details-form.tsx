"use client";

import { setAccountDetails } from "@/utils/onboarding";
import { Field, Form } from "houseform";
import { useRef } from "react";

interface AccountDetailsFormProps {}

const AccountDetailsForm = ({}: AccountDetailsFormProps) => {
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <Form>
      {({ isValid, submit }) => (
        <form
          ref={formRef}
          action={setAccountDetails}
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
          {/* <Field name="avatar">
            {({ value, setValue, onBlur, errors }) => (
              <div>
                <label htmlFor="avatar">Avatar</label>
                <input
                  id="avatar"
                  name="avatar"
                  placeholder="Avatar"
                  type="file"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  onBlur={onBlur}
                />
                {errors && <div>{errors}</div>}
              </div>
            )}
          </Field> */}

          <Field name="username">
            {({ value, setValue, onBlur, errors }) => (
              <div>
                <label htmlFor="username">Username</label>
                <input
                  id="username"
                  name="username"
                  placeholder="Username"
                  type="text"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  onBlur={onBlur}
                />
                {errors && <div>{errors}</div>}
              </div>
            )}
          </Field>

          <button disabled={!isValid} onClick={submit}>
            Continue
          </button>
        </form>
      )}
    </Form>
  );
};

export default AccountDetailsForm;
