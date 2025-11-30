import React, { useState } from "react";
import { Field, Input, Select, SelectStyles } from "@kor/ui";
import { inputFieldStyles, selectFieldStyles } from "@/components/field";
import { ComponentScreenLayout } from "@/components/shared/component-screen-layout";

export default function FieldComponentScreen() {
  const [textValue, setTextValue] = useState("");
  const [selectedValue, setSelectedValue] = useState<string | null>(null);

  return (
    <ComponentScreenLayout title="Field">
      <Field.Root value={textValue} onChange={setTextValue} styles={inputFieldStyles}>
        <Field.Label>Username</Field.Label>
        <Field.Control render={Input} />
      </Field.Root>
      <Field.Root value={selectedValue} onChange={setSelectedValue} styles={selectFieldStyles}>
        <Field.Label>Select</Field.Label>
        <Field.Control<SelectStyles>
          render={(props) => (
            <Select.Root {...props} placeholder="Select an option">
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
          )}
        />
      </Field.Root>
    </ComponentScreenLayout>
  );
}
