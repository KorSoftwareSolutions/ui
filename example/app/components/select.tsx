import { ComponentScreenLayout } from "@/components/component-screen-layout";
import { UseCaseSection } from "@/components/use-case-section";
import { Input, List, Select, Typography } from "@korsolutions/ui";
import React, { useState } from "react";
import { View } from "react-native";

export default function SelectComponentScreen() {
  return (
    <ComponentScreenLayout title="Select">
      <UseCaseSection title="Default">
        <DefaultExample />
      </UseCaseSection>
      <UseCaseSection title="Disabled">
        <DisabledExample />
      </UseCaseSection>
      <UseCaseSection title="Custom Option">
        <CustomOptionExample />
      </UseCaseSection>
      <UseCaseSection title="Combobox">
        <ComboboxExample />
      </UseCaseSection>
      <View style={{ flex: 1 }} />
      <UseCaseSection title="Above the fold">
        <AboveTheFoldExample />
      </UseCaseSection>
    </ComponentScreenLayout>
  );
}

const OPTIONS = [
  { value: "apple", children: "Apple", icon: "🍎", description: "A sweet red fruit" },
  { value: "banana", children: "Banana", icon: "🍌", description: "A long yellow fruit" },
  { value: "cherry", children: "Cherry", icon: "🍒", description: "A small red fruit" },
  { value: "date", children: "Date", icon: "🌴", description: "A sweet brown fruit" },
  { value: "elderberry", children: "Elderberry", icon: "🫐", description: "A small dark berry" },
  { value: "grape", children: "Grape", icon: "🍇", description: "A small round fruit" },
  { value: "honeydew", children: "Honeydew", icon: "🍈", description: "A sweet green melon" },
];

function DefaultExample() {
  const [value, setValue] = useState<string>();
  return (
    <Select.Root value={value} onChange={setValue}>
      <Select.Trigger placeholder="Select a fruit" />
      <Select.Portal>
        <Select.Overlay />
        <Select.Content>
          <List data={OPTIONS} keyExtractor={(item) => item.value} renderItem={({ item }) => <Select.Option {...item} />} />
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}

function DisabledExample() {
  return (
    <Select.Root isDisabled>
      <Select.Trigger placeholder="Select a fruit" />
    </Select.Root>
  );
}

function CustomOption(item: (typeof OPTIONS)[0]) {
  return (
    <View style={{ flexDirection: "row", gap: 8 }}>
      <Typography>{item.icon}</Typography>
      <View>
        <Typography variant="heading-md">{item.children}</Typography>
        <Typography>{item.description}</Typography>
      </View>
    </View>
  );
}

function CustomOptionExample() {
  const [value, setValue] = useState<string>();
  return (
    <Select.Root value={value} onChange={setValue}>
      <Select.Trigger placeholder="Select a fruit" />
      <Select.Portal>
        <Select.Overlay />
        <Select.Content>
          <List
            data={OPTIONS}
            keyExtractor={(item) => item.value}
            renderItem={({ item }) => (
              <Select.Option {...item}>
                <CustomOption {...item} />
              </Select.Option>
            )}
          />
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}

function ComboboxExample() {
  const [value, setValue] = useState<string>();
  const [inputValue, setInputValue] = useState<string>("");

  const filteredOptions = OPTIONS.filter((option) => option.children.toLowerCase().includes(inputValue.toLowerCase()));

  return (
    <Select.Root value={value} onChange={setValue}>
      <Select.Trigger placeholder="Select a fruit" />
      <Select.Portal>
        <Select.Overlay />
        <Select.Content>
          <Input
            variant="secondary"
            value={inputValue}
            onChange={setInputValue}
            placeholder="Type to filter..."
            style={{ marginBottom: 8 }}
            autoFocus
          />
          <List
            data={filteredOptions}
            keyExtractor={(item) => item.value}
            renderItem={({ item }) => (
              <Select.Option {...item}>
                <CustomOption {...item} />
              </Select.Option>
            )}
          />
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}

function AboveTheFoldExample() {
  const [value, setValue] = useState<string>();
  return (
    <Select.Root value={value} onChange={setValue}>
      <Select.Trigger placeholder="Select a fruit" />
      <Select.Portal>
        <Select.Overlay />
        <Select.Content>
          <List data={OPTIONS} keyExtractor={(item) => item.value} renderItem={({ item }) => <Select.Option {...item} />} />
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}
