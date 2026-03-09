import { Button, Card, Checkbox, Field, Icon, Input } from "@korsolutions/ui";
import { MailIcon } from "lucide-react-native";
import React, { useState } from "react";
import { ShowcaseBlock } from "./showcase-block";

export function SignInShowcase() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  return (
    <ShowcaseBlock title="Authentication">
      <Card.Header>
        <Card.Title>Sign in to your account</Card.Title>
      </Card.Header>
      <Card.Body>
        <Field.Root>
          <Field.Label for="signin-email">Email</Field.Label>
          <Input
            id="signin-email"
            value={email}
            onChange={setEmail}
            placeholder="you@example.com"
          />
        </Field.Root>
        <Field.Root>
          <Field.Label for="signin-password">Password</Field.Label>
          <Input
            id="signin-password"
            value={password}
            onChange={setPassword}
            placeholder="Password"
            secureTextEntry
          />
        </Field.Root>
        <Checkbox.Root value={remember} onChange={setRemember}>
          <Checkbox.Indicator />
          <Checkbox.Title>Remember me</Checkbox.Title>
        </Checkbox.Root>
      </Card.Body>
      <Card.Footer>
        <Button onPress={() => {}}>
          <Icon render={MailIcon} />
          Sign In
        </Button>
      </Card.Footer>
    </ShowcaseBlock>
  );
}
