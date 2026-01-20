import { ComponentScreenLayout } from "@/components/component-screen-layout";
import { UseCaseSection } from "@/components/use-case-section";
import { Progress } from "@korsolutions/ui/components";
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

      <UseCaseSection title="Custom colors">
        <CustomColorsExample />
      </UseCaseSection>
    </ComponentScreenLayout>
  );
}

function DefaultExample() {
  return <Progress value={50} />;
}

function DifferentValuesExample() {
  return (
    <View style={{ gap: 16, width: "100%" }}>
      <Progress value={0} />
      <Progress value={25} />
      <Progress value={50} />
      <Progress value={75} />
      <Progress value={100} />
    </View>
  );
}

function CustomColorsExample() {
  return (
    <View style={{ gap: 16, width: "100%" }}>
      <Progress value={60} indicatorColor="#10b981" />
      <Progress value={40} indicatorColor="#f59e0b" />
      <Progress value={80} indicatorColor="#ef4444" />
      <Progress value={90} indicatorColor="#8b5cf6" />
    </View>
  );
}
