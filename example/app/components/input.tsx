import React, { useState } from "react";
import { Input } from "@korsolutions/ui/components";
import { ComponentScreenLayout } from "@/components/shared/component-screen-layout";
import { UseCaseSection } from "@/components/shared/use-case-section";

export default function InputComponentScreen() {
  const [inputValue, setInputValue] = useState<string>("");

  return (
    <ComponentScreenLayout title="Input">
      <UseCaseSection title="Default">
        <Input value={inputValue} onChange={setInputValue} placeholder="Enter text" />
      </UseCaseSection>
      <UseCaseSection title="Disabled">
        <Input defaultValue="Sample text" isDisabled />
      </UseCaseSection>
    </ComponentScreenLayout>
  );
}
