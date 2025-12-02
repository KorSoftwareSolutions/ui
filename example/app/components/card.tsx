import React, { useState } from "react";
import { ComponentScreenLayout } from "@/components/shared/component-screen-layout";
import { Button, Card, Field, Input } from "@korsolutions/ui/components";

export default function CardComponentScreen() {
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  return (
    <ComponentScreenLayout title="Card">
      <Card title="Login to your account">
        <Field label="Email" description="We'll never share your email.">
          <Input value={emailValue} onChangeText={setEmailValue} placeholder="Email" />
        </Field>
        <Field label="Password" description="Must be at least 8 characters long.">
          <Input value={passwordValue} onChangeText={setPasswordValue} placeholder="Password" secureTextEntry />
        </Field>
        <Button>Login</Button>
      </Card>
    </ComponentScreenLayout>
  );
}
