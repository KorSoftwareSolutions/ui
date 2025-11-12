import React, { useState } from "react";
import { View } from "react-native";
import { Field, Input, Button } from "@kor/ui";

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
      <Field.Root value={textValue} onChange={setTextValue}>
        <Field.Label>Username</Field.Label>
        <Field.Control render={Input} />
      </Field.Root>
      <Button.Root onPress={onSubmit}>
        <Button.Label>Submit</Button.Label>
      </Button.Root>
    </View>
  );
}
