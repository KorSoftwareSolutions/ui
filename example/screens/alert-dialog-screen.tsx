import { ComponentScreenLayout } from "@/components/component-screen-layout";
import { UseCaseSection } from "@/components/use-case-section";
import {
  AlertDialog,
  AsyncAlertDialog,
  Button,
  Typography,
} from "@korsolutions/ui";
import { router, usePathname } from "expo-router";
import React from "react";

export function AlertDialogComponentScreen() {
  const pathname = usePathname();
  const isModalScreen = pathname?.endsWith("/modal");

  return (
    <ComponentScreenLayout
      title={isModalScreen ? "AlertDialog modal" : "AlertDialog"}
      backHref={isModalScreen ? "/components/alert-dialog" : undefined}
    >
      <UseCaseSection title="Default">
        <BasicExample />
      </UseCaseSection>

      <UseCaseSection title="Destructive action">
        <DestructiveExample />
      </UseCaseSection>

      <UseCaseSection title="With callback">
        <CallbackExample />
      </UseCaseSection>

      <UseCaseSection title="Async (await)">
        <AsyncExample />
      </UseCaseSection>

      {!isModalScreen && (
        <UseCaseSection title="In modal screen">
          <Button
            onPress={() => router.navigate("/components/alert-dialog/modal")}
            variant="secondary"
          >
            Open Modal Screen
          </Button>
        </UseCaseSection>
      )}
    </ComponentScreenLayout>
  );
}

function BasicExample() {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button>Show Alert Dialog</Button>
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay />
        <AlertDialog.Content>
          <AlertDialog.Title>Are you sure?</AlertDialog.Title>
          <AlertDialog.Description>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialog.Description>
          <AlertDialog.Footer>
            <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
            <AlertDialog.Action>Continue</AlertDialog.Action>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}

function DestructiveExample() {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button variant="secondary">Delete Account</Button>
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay />
        <AlertDialog.Content>
          <AlertDialog.Title>Delete Account</AlertDialog.Title>
          <AlertDialog.Description>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialog.Description>
          <AlertDialog.Footer>
            <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
            <AlertDialog.Action>Delete</AlertDialog.Action>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}

function CallbackExample() {
  const handleAction = () => {
    console.log("Action confirmed!");
  };

  const handleCancel = () => {
    console.log("Action cancelled!");
  };

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button>Confirm Action</Button>
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay />
        <AlertDialog.Content>
          <AlertDialog.Title>Confirm your action</AlertDialog.Title>
          <AlertDialog.Description>
            Are you sure you want to proceed with this operation?
          </AlertDialog.Description>
          <AlertDialog.Footer>
            <AlertDialog.Cancel onPress={handleCancel}>
              No, Cancel
            </AlertDialog.Cancel>
            <AlertDialog.Action onPress={handleAction}>
              Yes, Continue
            </AlertDialog.Action>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}

function AsyncExample() {
  const [result, setResult] = React.useState<string>("");

  const handleAsyncClick = async () => {
    const response = await AsyncAlertDialog.show({
      title: "Async Confirmation",
      description:
        "This dialog uses async/await pattern. Click an action to see the result.",
      actionLabel: "Confirm",
      cancelLabel: "Cancel",
    });

    setResult(response.confirmed ? "User confirmed!" : "User cancelled");
  };

  return (
    <>
      {result && <Typography>Result: {result}</Typography>}
      <Button onPress={handleAsyncClick}>Show Async Dialog</Button>
    </>
  );
}
