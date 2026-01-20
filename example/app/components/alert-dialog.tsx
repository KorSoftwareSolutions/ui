import { ComponentScreenLayout } from "@/components/component-screen-layout";
import { UseCaseSection } from "@/components/use-case-section";
import { Typography } from "@korsolutions/ui";
import { AlertDialog, AsyncAlertDialog, Button } from "@korsolutions/ui/components";
import React from "react";

export default function AlertDialogComponentScreen() {
  return (
    <ComponentScreenLayout title="AlertDialog">
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
    </ComponentScreenLayout>
  );
}

function BasicExample() {
  return (
    <AlertDialog
      trigger={<Button>Show Dialog</Button>}
      title="Are you sure?"
      description="This action cannot be undone. This will permanently delete your account and remove your data from our servers."
    />
  );
}

function DestructiveExample() {
  return (
    <AlertDialog
      trigger={<Button variant="secondary">Delete Account</Button>}
      title="Delete Account"
      description="This action cannot be undone. This will permanently delete your account and remove your data from our servers."
      actionLabel="Delete"
      cancelLabel="Cancel"
    />
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
    <AlertDialog
      trigger={<Button>Confirm Action</Button>}
      title="Confirm your action"
      description="Are you sure you want to proceed with this operation?"
      actionLabel="Yes, Continue"
      cancelLabel="No, Cancel"
      onAction={handleAction}
      onCancel={handleCancel}
    />
  );
}

function AsyncExample() {
  const [result, setResult] = React.useState<string>("");

  const handleAsyncClick = async () => {
    const response = await AsyncAlertDialog.show({
      title: "Async Confirmation",
      description: "This dialog uses async/await pattern. Click an action to see the result.",
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
