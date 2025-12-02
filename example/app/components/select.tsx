import React, { useState } from "react";
import { Select } from "@korsolutions/ui/primitives";
import { defaultSelectStyles } from "@/components/select";
import { ComponentScreenLayout } from "@/components/shared/component-screen-layout";

export default function SelectComponentScreen() {
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  return (
    <ComponentScreenLayout title="Select">
      <Select.Root value={selectedValue} onChange={setSelectedValue} placeholder="Select an option" styles={defaultSelectStyles}>
        <Select.Trigger>
          <Select.Value />
        </Select.Trigger>
        <Select.Portal>
          <Select.Overlay />
          <Select.Content>
            <Select.Option value="option1">Option 1</Select.Option>
            <Select.Option value="option2">Option 2</Select.Option>
            <Select.Option value="option3">Option 3</Select.Option>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </ComponentScreenLayout>
  );
}
