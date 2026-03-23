import { ComponentScreenLayout } from "@/components/component-screen-layout";
import { UseCaseSection } from "@/components/use-case-section";
import { Button, FullScreenSpinner, Spinner } from "@korsolutions/ui";
import React from "react";

export default function SpinnerScreen() {
  return (
    <ComponentScreenLayout title="Spinner">
      <UseCaseSection title="Default">
        <Spinner />
      </UseCaseSection>
      <UseCaseSection title="Full screen spinner with description">
        <Button
          onPress={() => {
            FullScreenSpinner.show({ description: "Loading data..." });
            setTimeout(() => FullScreenSpinner.hide(), 3000);
          }}
        >
          Show Spinner (3s)
        </Button>
      </UseCaseSection>
      <UseCaseSection title="Full screen spinner without description">
        <Button
          variant="secondary"
          onPress={() => {
            FullScreenSpinner.show();
            setTimeout(() => FullScreenSpinner.hide(), 3000);
          }}
        >
          Show Spinner (3s)
        </Button>
      </UseCaseSection>
    </ComponentScreenLayout>
  );
}
