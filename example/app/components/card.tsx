import { ComponentScreenLayout } from "@/components/component-screen-layout";
import { Button, Card, Input } from "@korsolutions/ui";
import { Field } from "@korsolutions/ui/components";
import React, { useState } from "react";

export default function CardComponentScreen() {
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  return (
    <ComponentScreenLayout title="Card">
      <Card.Root>
        <Card.Header>
          <Card.Title>Login to your account</Card.Title>
        </Card.Header>
        <Card.Body>
          <Field label="Email" description="We'll never share your email.">
            <Input value={emailValue} onChangeText={setEmailValue} placeholder="Email" />
          </Field>
          <Field label="Password" description="Must be at least 8 characters long.">
            <Input value={passwordValue} onChangeText={setPasswordValue} placeholder="Password" secureTextEntry />
          </Field>
        </Card.Body>
        <Card.Footer>
          <Button.Root onPress={() => console.log("Logging in...")}>
            <Button.Label>Login</Button.Label>
          </Button.Root>
        </Card.Footer>
      </Card.Root>
    </ComponentScreenLayout>
  );
}
