import { ComponentScreenLayout } from "@/components/component-screen-layout";
import { UseCaseSection } from "@/components/use-case-section";
import { Textarea } from "@korsolutions/ui";
import React, { useState } from "react";

export default function TextareaComponentScreen() {
  const [value, setValue] = useState("");
  const [withValue, setWithValue] = useState("This is a multiline text input that allows users to enter longer text content.");

  return (
    <ComponentScreenLayout title="Textarea">
      <UseCaseSection title="Default">
        <Textarea placeholder="Enter your message..." value={value} onChange={setValue} />
      </UseCaseSection>
      <UseCaseSection title="With Value">
        <Textarea placeholder="Enter your message..." value={withValue} onChange={setWithValue} />
      </UseCaseSection>
      <UseCaseSection title="Disabled">
        <Textarea placeholder="This textarea is disabled" isDisabled value="You cannot edit this text" onChange={() => {}} />
      </UseCaseSection>
      <UseCaseSection title="With Placeholder">
        <Textarea placeholder="Tell us about yourself..." onChange={() => {}} />
      </UseCaseSection>
    </ComponentScreenLayout>
  );
}
