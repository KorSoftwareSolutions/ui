import { ComponentScreenLayout } from "@/components/component-screen-layout";
import { UseCaseSection } from "@/components/use-case-section";
import { Button, Icon } from "@korsolutions/ui";
import { LogIn, Mail, Save, Trash2 } from "lucide-react-native";
import React from "react";

export default function ButtonComponentScreen() {
  const onSubmit = () => {
    console.log("Button pressed");
  };

  return (
    <ComponentScreenLayout title="Button">
      <UseCaseSection title="Default">
        <Button onPress={onSubmit}>Submit</Button>
      </UseCaseSection>
      <UseCaseSection title="With Icons">
        <Button onPress={onSubmit}>
          <Icon render={Save} />
          Save
        </Button>
        <Button variant="secondary" onPress={onSubmit}>
          <Icon render={Mail} />
          Send Email
        </Button>
        <Button variant="ghost" onPress={onSubmit}>
          <Icon render={Trash2} />
          Delete
        </Button>
        <Button onPress={onSubmit}>
          <Icon render={LogIn} />
          Sign In
        </Button>
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
      <UseCaseSection title="Ghost">
        <Button variant="ghost" onPress={onSubmit}>
          Submit
        </Button>
      </UseCaseSection>
      <UseCaseSection title="Ghost disabled">
        <Button variant="ghost" onPress={onSubmit} isDisabled>
          Submit
        </Button>
      </UseCaseSection>
      <UseCaseSection title="Ghost loading">
        <Button variant="ghost" onPress={onSubmit} isLoading>
          Submitting...
        </Button>
      </UseCaseSection>
    </ComponentScreenLayout>
  );
}
