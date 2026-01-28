import { ComponentScreenLayout } from "@/components/component-screen-layout";
import { UseCaseSection } from "@/components/use-case-section";
import { Progress } from "@korsolutions/ui";
import React from "react";
import { View } from "react-native";

export default function ProgressComponentScreen() {
  return (
    <ComponentScreenLayout title="Progress">
      <UseCaseSection title="Default variant">
        <DefaultExample />
      </UseCaseSection>

      <UseCaseSection title="Different values">
        <DifferentValuesExample />
      </UseCaseSection>
    </ComponentScreenLayout>
  );
}

function DefaultExample() {
  return (
    <Progress.Root value={50}>
      <Progress.Indicator />
    </Progress.Root>
  );
}

function DifferentValuesExample() {
  return (
    <View style={{ gap: 16, width: "100%" }}>
      <Progress.Root value={0}>
        <Progress.Indicator />
      </Progress.Root>
      <Progress.Root value={25}>
        <Progress.Indicator />
      </Progress.Root>
      <Progress.Root value={50}>
        <Progress.Indicator />
      </Progress.Root>
      <Progress.Root value={75}>
        <Progress.Indicator />
      </Progress.Root>
      <Progress.Root value={100}>
        <Progress.Indicator />
      </Progress.Root>
    </View>
  );
}
