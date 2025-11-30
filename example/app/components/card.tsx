import React, { useState } from "react";
import { Button, Card, Field, Input, InputStyles } from "@kor/ui";
import { defaultCardStyles } from "@/components/card";
import { ComponentScreenLayout } from "@/components/shared/component-screen-layout";
import { inputFieldStyles } from "@/components/field";
import { defaultButtonStyles } from "@/components/button";

export default function CardComponentScreen() {
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  return (
    <ComponentScreenLayout title="Card">
      <Card.Root styles={defaultCardStyles}>
        <Card.Header>
          <Card.Title>Login to your account</Card.Title>
        </Card.Header>
        <Card.Body>
          <Field.Root value={emailValue} onChange={setEmailValue} styles={inputFieldStyles}>
            <Field.Label>Username</Field.Label>
            <Field.Control<InputStyles> render={(props) => <Input {...props} />} />
          </Field.Root>
          <Field.Root value={passwordValue} onChange={setPasswordValue} styles={inputFieldStyles}>
            <Field.Label>Password</Field.Label>
            <Field.Control<InputStyles> render={(props) => <Input {...props} />} />
          </Field.Root>
        </Card.Body>
        <Card.Footer>
          <Button.Root styles={defaultButtonStyles}>
            <Button.Label>Login</Button.Label>
          </Button.Root>
        </Card.Footer>
      </Card.Root>
    </ComponentScreenLayout>
  );
}
