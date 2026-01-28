import { ComponentScreenLayout } from "@/components/component-screen-layout";
import { Field, Input } from "@korsolutions/ui";
import React from "react";

export default function FieldComponentScreen() {
  return (
    <ComponentScreenLayout title="Field">
      <Field.Root>
        <Field.Label for="username">Username</Field.Label>
        <Field.Description>Choose a unique username for your account.</Field.Description>
        <Input id="username" placeholder="Enter your username" />
      </Field.Root>
      <Field.Root>
        <Field.Label for="password">Password</Field.Label>
        <Field.Description>Your password must be at least 8 characters long.</Field.Description>
        <Input id="password" placeholder="Enter your password" />
      </Field.Root>
    </ComponentScreenLayout>
  );
}
