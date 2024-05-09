"use client";

import { verifyUser } from "@/utils/user";
import { Field, Form } from "houseform";
import { useRef } from "react";

const VerifyForm = () => {
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <Form>
      {({ isValid, submit }) => (
        <form
          ref={formRef}
          action={verifyUser}
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
          <Field name="code">
            {({ value, setValue, onBlur, errors }) => (
              <div>
                <label htmlFor="code">Code</label>
                <input
                  id="code"
                  name="code"
                  placeholder="Code"
                  type="text"
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
            Verify
          </button>
        </form>
      )}
    </Form>
  );
};

export default VerifyForm;
