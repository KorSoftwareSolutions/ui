import React, { useState } from "react";
import { Field, Input, InputStyles } from "@korsolutions/ui/primitives";
import { ComponentScreenLayout } from "@/components/shared/component-screen-layout";
import { inputFieldStyles } from "@/components/field";
import { Button, Card } from "@korsolutions/ui/components";

export default function CardComponentScreen() {
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  return (
    <ComponentScreenLayout title="Card">
      <Card title="Login to your account">
        <Field.Root value={emailValue} onChange={setEmailValue} styles={inputFieldStyles}>
          <Field.Label>Username</Field.Label>
          <Field.Control<InputStyles> render={(props) => <Input {...props} />} />
        </Field.Root>
        <Field.Root value={passwordValue} onChange={setPasswordValue} styles={inputFieldStyles}>
          <Field.Label>Password</Field.Label>
          <Field.Control<InputStyles> render={(props) => <Input {...props} />} />
        </Field.Root>
        <Button>Login</Button>
      </Card>
    </ComponentScreenLayout>
  );
}
