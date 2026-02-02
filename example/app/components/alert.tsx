import { ComponentScreenLayout } from "@/components/component-screen-layout";
import { UseCaseSection } from "@/components/use-case-section";
import { Alert } from "@korsolutions/ui";
import { AlertCircleIcon, InfoIcon } from "lucide-react-native";
import React from "react";
import { View } from "react-native";

export default function AlertComponentScreen() {
  return (
    <ComponentScreenLayout title="Alert">
      <UseCaseSection title="Default variant">
        <DefaultExample />
      </UseCaseSection>

      <UseCaseSection title="Destructive variant">
        <DestructiveExample />
      </UseCaseSection>

      <UseCaseSection title="With icon">
        <WithIconExample />
      </UseCaseSection>
    </ComponentScreenLayout>
  );
}

function DefaultExample() {
  return (
    <Alert.Root>
      <Alert.Body>
        <Alert.Title>Note</Alert.Title>
        <Alert.Description>This is a default alert with a title and description.</Alert.Description>
      </Alert.Body>
    </Alert.Root>
  );
}

function DestructiveExample() {
  return (
    <Alert.Root variant="destructive">
      <Alert.Body>
        <Alert.Title>Error</Alert.Title>
        <Alert.Description>Something went wrong. Please try again later.</Alert.Description>
      </Alert.Body>
    </Alert.Root>
  );
}

function WithIconExample() {
  return (
    <View style={{ gap: 16, width: "100%" }}>
      <Alert.Root>
        <Alert.Icon render={InfoIcon} />
        <Alert.Body>
          <Alert.Title>Information</Alert.Title>
          <Alert.Description>Here&apos;s some important information you should know.</Alert.Description>
        </Alert.Body>
      </Alert.Root>
      <Alert.Root variant="destructive">
        <Alert.Icon render={AlertCircleIcon} />
        <Alert.Body>
          <Alert.Title>Warning</Alert.Title>
          <Alert.Description>This action cannot be undone.</Alert.Description>
        </Alert.Body>
      </Alert.Root>
    </View>
  );
}
