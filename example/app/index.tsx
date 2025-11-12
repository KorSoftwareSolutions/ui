import React, { useState } from "react";
import { View } from "react-native";
import { Field, Input, Button } from "@kor/ui";
import { FieldStyles } from "../../library/primitives/field/field-root";

const fieldStyles: FieldStyles = {
  root: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
  },
  control: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 8,
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
    <View
      style={{
        flex: 1,
        padding: 32,
      }}
    >
      <Field.Root value={textValue} onChange={setTextValue} styles={fieldStyles}>
        <Field.Label>Username</Field.Label>
        <Field.Control render={Input} />
      </Field.Root>
      <Button.Root onPress={onSubmit}>
        <Button.Label>Submit</Button.Label>
      </Button.Root>
    </View>
  );
}
