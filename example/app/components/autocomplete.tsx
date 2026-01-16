import { ComponentScreenLayout } from "@/components/component-screen-layout";
import { UseCaseSection } from "@/components/use-case-section";
import { Autocomplete, Field, Typography } from "@korsolutions/ui/components";
import React, { useState } from "react";

const fruits = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "cherry", label: "Cherry" },
  { value: "date", label: "Date" },
  { value: "elderberry", label: "Elderberry" },
  { value: "fig", label: "Fig" },
  { value: "grape", label: "Grape" },
  { value: "honeydew", label: "Honeydew" },
];

const DefaultSection = () => {
  const [value, setValue] = useState<string>();
  const [inputValue, setInputValue] = useState<string>("");
  const filteredOptions = fruits.filter((fruit) => fruit.label.toLowerCase().includes((inputValue ?? "").toLowerCase()));

  return (
    <UseCaseSection title="Default">
      <Autocomplete
        options={filteredOptions}
        value={value}
        onChange={setValue}
        inputValue={inputValue}
        setInputValue={setInputValue}
        placeholder="Search fruits..."
      />
    </UseCaseSection>
  );
};

export default function AutocompleteComponentScreen() {
  const [asyncValue, setAsyncValue] = useState<string>();
  const [asyncOptions, setAsyncOptions] = useState(fruits);
  const [fieldValue, setFieldValue] = useState<string>();

  return (
    <ComponentScreenLayout title="Autocomplete">
      <DefaultSection />

      <UseCaseSection title="Async Simulation">
        <Autocomplete
          options={asyncOptions}
          value={asyncValue}
          onChange={(value) => {
            setAsyncValue(value);
            setAsyncOptions(fruits);
          }}
          placeholder="Type to search (simulated delay)..."
        />
        <Typography variant="body-sm">Simulates server-side filtering with 300ms delay</Typography>
      </UseCaseSection>

      <UseCaseSection title="Disabled">
        <Autocomplete options={fruits} placeholder="Disabled autocomplete" isDisabled />
      </UseCaseSection>

      <UseCaseSection title="With Field Integration">
        <Field label="Favorite Fruit" description="Select your favorite fruit from the list">
          <Autocomplete options={fruits} value={fieldValue} onChange={setFieldValue} placeholder="Select your favorite..." />
        </Field>
      </UseCaseSection>

      <UseCaseSection title="Custom Empty Message">
        <Autocomplete
          options={[
            { value: "red", label: "Red" },
            { value: "blue", label: "Blue" },
            { value: "green", label: "Green" },
          ]}
          placeholder="Search colors..."
          emptyMessage="No colors match your search"
        />
      </UseCaseSection>
    </ComponentScreenLayout>
  );
}
