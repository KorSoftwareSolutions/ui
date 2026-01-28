import { ComponentScreenLayout } from "@/components/component-screen-layout";
import { Input } from "@korsolutions/ui";
import { Field } from "@korsolutions/ui/components";
import React from "react";

export default function FieldComponentScreen() {
  return (
    <ComponentScreenLayout title="Field">
      <Field id="username" label="Username" description="Choose a unique username for your account.">
        <Input id="username" placeholder="Enter your username" />
      </Field>
      <Field id="password" label="Password" description="Choose a strong password for your account.">
        <Input id="password" placeholder="Enter your password" />
      </Field>
    </ComponentScreenLayout>
  );
}
