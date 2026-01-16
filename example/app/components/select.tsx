import { ComponentScreenLayout } from "@/components/component-screen-layout";
import { UseCaseSection } from "@/components/use-case-section";
import { Select } from "@korsolutions/ui/components";
import React, { useState } from "react";
import { View } from "react-native";

export default function SelectComponentScreen() {
  const [defaultValue, setDefaultValue] = useState<string>();
  return (
    <ComponentScreenLayout title="Select">
      <UseCaseSection title="Default">
        <Select
          options={[
            { value: "apple", label: "Apple" },
            { value: "banana", label: "Banana" },
            { value: "cherry", label: "Cherry" },
            { value: "date", label: "Date" },
            { value: "elderberry", label: "Elderberry" },
          ]}
          value={defaultValue}
          onChange={setDefaultValue}
          placeholder="Select a fruit"
        />
      </UseCaseSection>
      <UseCaseSection title="Disabled">
        <Select options={[{ value: "apple", label: "Apple" }]} placeholder="Select a fruit" isDisabled />
      </UseCaseSection>
      <View style={{ flex: 1 }} />
      <UseCaseSection title="Above the fold">
        <Select
          options={[
            { value: "apple", label: "Apple" },
            { value: "banana", label: "Banana" },
            { value: "cherry", label: "Cherry" },
            { value: "date", label: "Date" },
            { value: "elderberry", label: "Elderberry" },
          ]}
          value={defaultValue}
          onChange={setDefaultValue}
          placeholder="Select a fruit"
        />
      </UseCaseSection>
    </ComponentScreenLayout>
  );
}
