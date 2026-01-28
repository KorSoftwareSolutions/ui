import { ComponentScreenLayout } from "@/components/component-screen-layout";
import { UseCaseSection } from "@/components/use-case-section";
import { Button, Toast } from "@korsolutions/ui";
import React from "react";

export default function ToastComponentScreen() {
  return (
    <ComponentScreenLayout title="Toast">
      <UseCaseSection title="Default">
        <Button.Root
          onPress={() => {
            Toast.show({
              id: "default-toast",
              title: "Notification",
              description: "This is a default toast message",
            });
          }}
        >
          <Button.Label>Show Default Toast</Button.Label>
        </Button.Root>
      </UseCaseSection>
      <UseCaseSection title="Default (Title only)">
        <Button.Root
          onPress={() => {
            Toast.show({
              id: "notification-toast",
              title: "Notification",
            });
          }}
        >
          <Button.Label>Show Toast (Title Only)</Button.Label>
        </Button.Root>
      </UseCaseSection>
      <UseCaseSection title="Success">
        <Button.Root
          variant="secondary"
          onPress={() => {
            Toast.show({
              id: "success-toast",
              variant: "success",
              title: "Success",
              description: "Your action was completed successfully",
            });
          }}
        >
          <Button.Label>Show Success Toast</Button.Label>
        </Button.Root>
      </UseCaseSection>
      <UseCaseSection title="Success (Title only)">
        <Button.Root
          variant="secondary"
          onPress={() => {
            Toast.show({
              id: "success-title-only",
              variant: "success",
              title: "Success",
            });
          }}
        >
          <Button.Label>Show Success (Title Only)</Button.Label>
        </Button.Root>
      </UseCaseSection>
      <UseCaseSection title="Danger">
        <Button.Root
          onPress={() => {
            Toast.show({
              id: "error-toast",
              variant: "danger",
              title: "Error",
              description: "Something went wrong. Please try again.",
            });
          }}
        >
          <Button.Label>Show Error Toast</Button.Label>
        </Button.Root>
      </UseCaseSection>
      <UseCaseSection title="Danger (Title only)">
        <Button.Root
          onPress={() => {
            Toast.show({
              id: "error-title-only",
              variant: "danger",
              title: "Error",
            });
          }}
        >
          <Button.Label>Show Error (Title Only)</Button.Label>
        </Button.Root>
      </UseCaseSection>
      <UseCaseSection title="Custom Duration">
        <Button.Root
          onPress={() => {
            Toast.show({
              id: "quick-toast",
              title: "Quick Message",
              description: "This will disappear in 1 second",
              duration: 1000,
            });
          }}
        >
          <Button.Label>Show 1s Toast</Button.Label>
        </Button.Root>
      </UseCaseSection>
      <UseCaseSection title="Duplicate Prevention (same ID)">
        <Button.Root
          onPress={() => {
            Toast.show({
              id: "duplicate-test",
              title: "Click me multiple times!",
              description: "Notice only one toast appears even if you spam this button",
            });
          }}
        >
          <Button.Label>Test Duplicate Prevention</Button.Label>
        </Button.Root>
      </UseCaseSection>
    </ComponentScreenLayout>
  );
}
