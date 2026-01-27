import { ComponentScreenLayout } from "@/components/component-screen-layout";
import { UseCaseSection } from "@/components/use-case-section";
import { Button } from "@korsolutions/ui";
import React from "react";

export default function ButtonComponentScreen() {
  const onSubmit = () => {
    console.log("Button pressed");
  };

  return (
    <ComponentScreenLayout title="Button">
      <UseCaseSection title="Default">
        <Button.Root onPress={onSubmit}>
          <Button.Label>Submit</Button.Label>
        </Button.Root>
      </UseCaseSection>
      <UseCaseSection title="Disabled">
        <Button.Root onPress={onSubmit} isDisabled>
          <Button.Label>Submit</Button.Label>
        </Button.Root>
      </UseCaseSection>
      <UseCaseSection title="Loading">
        <Button.Root onPress={onSubmit} isLoading>
          <Button.Label>Submitting...</Button.Label>
        </Button.Root>
      </UseCaseSection>
      <UseCaseSection title="Secondary">
        <Button.Root variant="secondary" onPress={onSubmit}>
          <Button.Label>Submit</Button.Label>
        </Button.Root>
      </UseCaseSection>
      <UseCaseSection title="Secondary disabled">
        <Button.Root variant="secondary" onPress={onSubmit} isDisabled>
          <Button.Label>Submit</Button.Label>
        </Button.Root>
      </UseCaseSection>
      <UseCaseSection title="Secondary loading">
        <Button.Root variant="secondary" onPress={onSubmit} isLoading>
          <Button.Label>Submitting...</Button.Label>
        </Button.Root>
      </UseCaseSection>
    </ComponentScreenLayout>
  );
}
