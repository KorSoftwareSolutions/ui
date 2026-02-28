import { ComponentScreenLayout } from "@/components/component-screen-layout";
import { Button, Card, Field, Input } from "@korsolutions/ui";
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
          <Field.Root>
            <Field.Label for="email">Email</Field.Label>
            <Field.Description>We&apos;ll never share your email.</Field.Description>
            {/* <Field label="Email" description="We'll never share your email."> */}
            <Input id="email" value={emailValue} onChange={setEmailValue} placeholder="Email" />
          </Field.Root>
          <Field.Root>
            <Field.Label for="password">Password</Field.Label>
            <Field.Description>Must be at least 8 characters long.</Field.Description>
            <Input id="password" value={passwordValue} onChange={setPasswordValue} placeholder="Password" secureTextEntry />
          </Field.Root>
        </Card.Body>
        <Card.Footer>
          <Button onPress={() => console.log("Logging in...")}>Login</Button>
        </Card.Footer>
      </Card.Root>
    </ComponentScreenLayout>
  );
}
