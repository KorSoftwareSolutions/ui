import React from "react";
import { Button } from "@korsolutions/ui/components";
import { ComponentScreenLayout } from "@/components/component-screen-layout";
import { UseCaseSection } from "@/components/use-case-section";

export default function ButtonComponentScreen() {
  const onSubmit = () => {
    console.log("Button pressed");
  };

  return (
    <ComponentScreenLayout title="Button">
      <UseCaseSection title="Default">
        <Button onPress={onSubmit}>Submit</Button>
      </UseCaseSection>
      <UseCaseSection title="Disabled">
        <Button onPress={onSubmit} isDisabled>
          Submit
        </Button>
      </UseCaseSection>
      <UseCaseSection title="Loading">
        <Button onPress={onSubmit} isLoading>
          Submitting...
        </Button>
      </UseCaseSection>
      <UseCaseSection title="Secondary">
        <Button variant="secondary" onPress={onSubmit}>
          Submit
        </Button>
      </UseCaseSection>
      <UseCaseSection title="Secondary disabled">
        <Button variant="secondary" onPress={onSubmit} isDisabled>
          Submit
        </Button>
      </UseCaseSection>
      <UseCaseSection title="Secondary loading">
        <Button variant="secondary" onPress={onSubmit} isLoading>
          Submitting...
        </Button>
      </UseCaseSection>
    </ComponentScreenLayout>
  );
}
