import React, { useState } from "react";
import { ScrollView } from "react-native";
import { Field, Input, Button, FieldStyles, Select, ButtonStyles, UniversalUIProvider, SelectStyles } from "@kor/ui";

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
      top: 16,
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
      paddingTop: 20,
      paddingBottom: 12,
      minHeight: 48,
    },
  },
};

const buttonStyles: ButtonStyles = {
  root: {
    default: {
      backgroundColor: "#007AFF",
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderRadius: 4,
      alignItems: "center",
    },
    disabled: {
      backgroundColor: "#A0A0A0",
    },
  },
  label: {
    default: {
      color: "#FFFFFF",
      fontSize: 16,
      fontWeight: "600",
    },
    disabled: {
      color: "#E0E0E0",
    },
  },
};

const selectStyles: SelectStyles = {
  root: {
    default: {
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 4,
      paddingHorizontal: 12,
      paddingVertical: 8,
      minHeight: 48,
      justifyContent: "center",
    },
    disabled: {
      backgroundColor: "#F0F0F0",
    },
  },
  trigger: {
    default: {},
  },
  content: {
    default: {
      position: "absolute",
      top: 56,
      left: 0,
      right: 0,
      backgroundColor: "#FFFFFF",
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 4,
      maxHeight: 200,
      zIndex: 1000,
    },
  },
  option: {
    default: {
      paddingVertical: 12,
      paddingHorizontal: 16,
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
    <UniversalUIProvider>
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
          <Field.Label>Select</Field.Label>
          <Field.Control
            render={(props) => (
              <Select.Root {...props} styles={selectStyles}>
                <Select.Trigger />
                <Select.Content>
                  <Select.Option>Option 1</Select.Option>
                  <Select.Option>Option 2</Select.Option>
                  <Select.Option>Option 3</Select.Option>
                </Select.Content>
              </Select.Root>
            )}
          />
        </Field.Root>
        <Button.Root onPress={onSubmit} styles={buttonStyles}>
          <Button.Label>Submit</Button.Label>
        </Button.Root>
      </ScrollView>
    </UniversalUIProvider>
  );
}
