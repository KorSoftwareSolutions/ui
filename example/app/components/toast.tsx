import React from "react";
import { Toast, Button } from "@korsolutions/ui/components";
import { ComponentScreenLayout } from "@/components/component-screen-layout";
import { UseCaseSection } from "@/components/use-case-section";

export default function ToastComponentScreen() {
  return (
    <ComponentScreenLayout title="Toast">
      <UseCaseSection title="Default">
        <Button
          onPress={() => {
            Toast.show({
              id: "default-toast",
              title: "Notification",
              description: "This is a default toast message",
            });
          }}
        >
          Show Default Toast
        </Button>
      </UseCaseSection>
      <UseCaseSection title="Default (Title only)">
        <Button
          onPress={() => {
            Toast.show({
              id: "notification-toast",
              title: "Notification",
            });
          }}
        >
          Show Toast (Title Only)
        </Button>
      </UseCaseSection>
      <UseCaseSection title="Success">
        <Button
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
          Show Success Toast
        </Button>
      </UseCaseSection>
      <UseCaseSection title="Success (Title only)">
        <Button
          variant="secondary"
          onPress={() => {
            Toast.show({
              id: "success-title-only",
              variant: "success",
              title: "Success",
            });
          }}
        >
          Show Success (Title Only)
        </Button>
      </UseCaseSection>
      <UseCaseSection title="Danger">
        <Button
          onPress={() => {
            Toast.show({
              id: "error-toast",
              variant: "danger",
              title: "Error",
              description: "Something went wrong. Please try again.",
            });
          }}
        >
          Show Error Toast
        </Button>
      </UseCaseSection>
      <UseCaseSection title="Danger (Title only)">
        <Button
          onPress={() => {
            Toast.show({
              id: "error-title-only",
              variant: "danger",
              title: "Error",
            });
          }}
        >
          Show Error (Title Only)
        </Button>
      </UseCaseSection>
      <UseCaseSection title="Custom Duration">
        <Button
          onPress={() => {
            Toast.show({
              id: "quick-toast",
              title: "Quick Message",
              description: "This will disappear in 1 second",
              duration: 1000,
            });
          }}
        >
          Show 1s Toast
        </Button>
      </UseCaseSection>
      <UseCaseSection title="Duplicate Prevention (same ID)">
        <Button
          onPress={() => {
            Toast.show({
              id: "duplicate-test",
              title: "Click me multiple times!",
              description: "Notice only one toast appears even if you spam this button",
            });
          }}
        >
          Test Duplicate Prevention
        </Button>
      </UseCaseSection>
    </ComponentScreenLayout>
  );
}
