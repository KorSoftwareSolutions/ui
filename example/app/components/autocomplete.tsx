import { ComponentScreenLayout } from "@/components/component-screen-layout";
import { UseCaseSection } from "@/components/use-case-section";
import { Autocomplete, List, Typography } from "@korsolutions/ui";
import { Field } from "@korsolutions/ui/components";
import React, { useState } from "react";
import { Pressable } from "react-native";

export default function AutocompleteComponentScreen() {
  return (
    <ComponentScreenLayout title="Autocomplete">
      <DefaultSection />

      <UseCaseSection title="Async Simulation">
        <AsyncSection />
        <Typography variant="body-sm">Simulates server-side filtering with 300ms delay</Typography>
      </UseCaseSection>

      <UseCaseSection title="Disabled">
        <DisabledSection />
      </UseCaseSection>

      <UseCaseSection title="With Field Integration">
        <WithFieldIntegrationSection />
      </UseCaseSection>

      <UseCaseSection title="Preselected">
        <PreselectedSection />
      </UseCaseSection>

      <UseCaseSection title="Add Option">
        <AddOptionSection />
      </UseCaseSection>
    </ComponentScreenLayout>
  );
}

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
      <Autocomplete.Root value={value} onChange={setValue} inputValue={inputValue} onInputChange={setInputValue}>
        <Autocomplete.Input placeholder="Search fruits..." />
        <Autocomplete.Portal>
          <Autocomplete.Overlay />
          <Autocomplete.Content>
            <List
              data={filteredOptions}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => <Autocomplete.Option value={item.value}>{item.label}</Autocomplete.Option>}
              renderEmpty={() => <Autocomplete.Empty>No fruits found</Autocomplete.Empty>}
            />
          </Autocomplete.Content>
        </Autocomplete.Portal>
      </Autocomplete.Root>
    </UseCaseSection>
  );
};

const AsyncSection = () => {
  const [value, setValue] = useState<string>();
  const [inputValue, setInputValue] = useState<string>("");
  const [options, setOptions] = useState(fruits);
  const [isLoading, setIsLoading] = useState(false);

  const onInputChange = (val: string) => {
    console.log("Input changed:", val);
    setInputValue(val);
    setOptions([]);

    setIsLoading(true);
    setTimeout(() => {
      const filtered = fruits.filter((fruit) => fruit.label.toLowerCase().includes(val.toLowerCase()));
      setOptions(filtered);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <Autocomplete.Root value={value} onChange={setValue} inputValue={inputValue} onInputChange={onInputChange}>
      <Autocomplete.Input placeholder="Type to search (simulated delay)..." />
      <Autocomplete.Portal>
        <Autocomplete.Overlay />
        <Autocomplete.Content>
          <List
            data={options}
            keyExtractor={(item) => item.value}
            renderItem={({ item }) => <Autocomplete.Option value={item.value}>{item.label}</Autocomplete.Option>}
            renderEmpty={() => <Autocomplete.Empty>{isLoading ? "Loading..." : "No fruits found"}</Autocomplete.Empty>}
          />
        </Autocomplete.Content>
      </Autocomplete.Portal>
    </Autocomplete.Root>
  );
};

const DisabledSection = () => {
  return (
    <Autocomplete.Root isDisabled>
      <Autocomplete.Input placeholder="Disabled autocomplete" />
    </Autocomplete.Root>
  );
};

const WithFieldIntegrationSection = () => {
  const [value, setValue] = useState<string>();

  return (
    <Field label="Favorite Fruit" description="Select your favorite fruit from the list">
      <Autocomplete.Root value={value} onChange={setValue}>
        <Autocomplete.Input placeholder="Select your favorite..." />
        <Autocomplete.Portal>
          <Autocomplete.Overlay />
          <Autocomplete.Content>
            <List
              data={fruits}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => <Autocomplete.Option value={item.value}>{item.label}</Autocomplete.Option>}
              renderEmpty={() => <Autocomplete.Empty>No fruits found</Autocomplete.Empty>}
            />
          </Autocomplete.Content>
        </Autocomplete.Portal>
      </Autocomplete.Root>
    </Field>
  );
};

const PreselectedSection = () => {
  return (
    <Autocomplete.Root value="red">
      <Autocomplete.Input placeholder="Search colors..." />
      <Autocomplete.Portal>
        <Autocomplete.Overlay />
        <Autocomplete.Content>
          <List
            data={[
              { value: "red", label: "Red" },
              { value: "blue", label: "Blue" },
              { value: "green", label: "Green" },
            ]}
            keyExtractor={(item) => item.value}
            renderItem={({ item }) => <Autocomplete.Option value={item.value}>{item.label}</Autocomplete.Option>}
            renderEmpty={() => <Autocomplete.Empty>No colors match your search</Autocomplete.Empty>}
          />
        </Autocomplete.Content>
      </Autocomplete.Portal>
    </Autocomplete.Root>
  );
};

const AddOptionSection = () => {
  const [value, setValue] = useState<string>();
  const [inputValue, setInputValue] = useState<string>("");

  const filteredOptions = fruits.filter((fruit) => fruit.label.toLowerCase().includes((inputValue ?? "").toLowerCase()));

  return (
    <Autocomplete.Root value={value} onChange={setValue} inputValue={inputValue} onInputChange={setInputValue}>
      <Autocomplete.Input placeholder="Search fruits..." />
      <Autocomplete.Portal>
        <Autocomplete.Overlay />
        <Autocomplete.Content>
          <List
            data={filteredOptions}
            keyExtractor={(item) => item.value}
            renderItem={({ item }) => <Autocomplete.Option value={item.value}>{item.label}</Autocomplete.Option>}
            renderEmpty={() => (
              <Pressable>
                <Autocomplete.Empty>Add &quot;{inputValue}&quot;</Autocomplete.Empty>
              </Pressable>
            )}
          />
        </Autocomplete.Content>
      </Autocomplete.Portal>
    </Autocomplete.Root>
  );
};
