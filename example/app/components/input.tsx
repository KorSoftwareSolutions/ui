import React, { useState } from "react";
import { Input } from "@korsolutions/ui/primitives";
import { defaultInputStyles } from "@/components/input";
import { ComponentScreenLayout } from "@/components/shared/component-screen-layout";

export default function InputComponentScreen() {
  const [inputValue, setInputValue] = useState<string | null>(null);
  return (
    <ComponentScreenLayout title="Input">
      <Input value={inputValue} onChange={setInputValue} styles={defaultInputStyles} />
    </ComponentScreenLayout>
  );
}
