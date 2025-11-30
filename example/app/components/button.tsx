import React from "react";
import { Button } from "@kor/ui";
import { defaultButtonStyles } from "@/components/button";
import { ComponentScreenLayout } from "@/components/shared/component-screen-layout";

export default function ButtonComponentScreen() {
  const onSubmit = () => {
    console.log("Button pressed");
  };

  return (
    <ComponentScreenLayout title="Button">
      <Button.Root onPress={onSubmit} styles={defaultButtonStyles}>
        <Button.Label>Submit</Button.Label>
      </Button.Root>
    </ComponentScreenLayout>
  );
}
