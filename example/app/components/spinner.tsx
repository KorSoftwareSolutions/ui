import { ComponentScreenLayout } from "@/components/component-screen-layout";
import { UseCaseSection } from "@/components/use-case-section";
import { Spinner } from "@korsolutions/ui";
import React from "react";

export default function SpinnerScreen() {
  return (
    <ComponentScreenLayout title="Spinner">
      <UseCaseSection title="Default">
        <Spinner />
      </UseCaseSection>
    </ComponentScreenLayout>
  );
}
