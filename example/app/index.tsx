import React, { useState } from "react";
import { ScrollView } from "react-native";
import { Field, Input, Button, FieldStyles, Select, ButtonStyles, SelectStyles, InputProps } from "@kor/ui";

const defaultInputStyles: InputProps["style"] = {
  borderWidth: 1,
  borderColor: "#ccc",
  borderRadius: 4,
  paddingVertical: 12,
  paddingHorizontal: 16,
  minHeight: 48,
  outlineWidth: 0,
};

const selectStyles: SelectStyles = {
  trigger: {
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

const baseFieldStyles: FieldStyles<void> = {
  root: {
    default: {},
  },
  label: {
    default: {
      fontSize: 16,
      color: "#666",
      marginBottom: 4,
    },
  },
};

const inputFieldStyles: FieldStyles<InputProps["style"]> = {
  ...baseFieldStyles,
  control: {
    default: defaultInputStyles,
    focused: {
      borderColor: "#007AFF",
    },
  },
};

const selectFieldStyles: FieldStyles<SelectStyles> = {
  ...baseFieldStyles,
  control: {
    default: selectStyles,
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

export default function Home() {
  /* ******************** Hooks ******************** */
  const [textValue, setTextValue] = useState("");
  const [selectedValue, setSelectedValue] = useState<string | null>(null);

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
      <Field.Root value={textValue} onChange={setTextValue} styles={inputFieldStyles}>
        <Field.Label>Username</Field.Label>
        <Field.Control render={Input} />
      </Field.Root>
      <Field.Root value={selectedValue} onChange={setSelectedValue} styles={selectFieldStyles}>
        <Field.Label>Select</Field.Label>
        <Field.Control
          render={(props) => (
            <Select.Root {...props} placeholder="Select an option" styles={selectStyles}>
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
      <Button.Root onPress={onSubmit} styles={buttonStyles}>
        <Button.Label>Submit</Button.Label>
      </Button.Root>
    </ScrollView>
  );
}
