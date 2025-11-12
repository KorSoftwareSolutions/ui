import React, { useState } from "react";
import { ScrollView } from "react-native";
import { Field, Input, Button, FieldStyles, Select } from "@kor/ui";

const fieldStyles: FieldStyles = {
  root: {
    default: {
      position: "relative",
    },
  },
  label: {
    default: {
      fontSize: 16,
      position: "absolute",
      top: 14,
      left: 12,
      color: "#666",
      pointerEvents: "none",
      transitionProperty: ["top", "fontSize"],
      transitionDuration: "200ms",
    },
    focused: {
      top: 4,
      fontSize: 12,
    },
  },
  control: {
    default: {
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 4,
      paddingHorizontal: 12,
      paddingTop: 18,
      paddingBottom: 12,
    },
  },
};

export default function Home() {
  /* ******************** Hooks ******************** */
  const [textValue, setTextValue] = useState("");

  /* ******************** Variables ******************** */
  /* ******************** Functions ******************** */
  const onSubmit = () => {
    console.log("Submitted value:", textValue);
  };

  /* ******************** Effects ******************** */
  /* ******************** JSX ******************** */
  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{
        padding: 32,
        gap: 32,
      }}
    >
      <Field.Root value={textValue} onChange={setTextValue} styles={fieldStyles}>
        <Field.Label>Username</Field.Label>
        <Field.Control render={Input} />
      </Field.Root>
      <Field.Root value={textValue} onChange={setTextValue} styles={fieldStyles}>
        <Field.Label>Username</Field.Label>
        <Field.Control
          render={(props) => (
            <Select.Root {...props}>
              <Select.Trigger />
              <Select.Content>
                <Select.Option style={{ padding: 12 }}>Option 1</Select.Option>
                <Select.Option style={{ padding: 12 }}>Option 2</Select.Option>
                <Select.Option style={{ padding: 12 }}>Option 3</Select.Option>
              </Select.Content>
            </Select.Root>
          )}
        />
      </Field.Root>
      <Button.Root onPress={onSubmit}>
        <Button.Label>Submit</Button.Label>
      </Button.Root>
    </ScrollView>
  );
}
