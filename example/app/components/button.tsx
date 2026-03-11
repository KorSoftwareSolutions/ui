import { ComponentScreenLayout } from "@/components/component-screen-layout";
import { UseCaseSection } from "@/components/use-case-section";
import { Button, Icon } from "@korsolutions/ui";
import { Save } from "lucide-react-native";
import React from "react";
import { View } from "react-native";

export default function ButtonComponentScreen() {
  const onSubmit = () => {
    console.log("Button pressed");
  };

  return (
    <ComponentScreenLayout title="Button">
      <UseCaseSection title="Default">
        <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
          <Button size="sm" onPress={onSubmit}>
            Small
          </Button>
          <Button size="md" onPress={onSubmit}>
            Medium
          </Button>
          <Button size="lg" onPress={onSubmit}>
            Large
          </Button>
        </View>
      </UseCaseSection>
      <UseCaseSection title="Secondary" direction="row">
        <Button variant="secondary" size="sm" onPress={onSubmit}>
          Small
        </Button>
        <Button variant="secondary" size="md" onPress={onSubmit}>
          Medium
        </Button>
        <Button variant="secondary" size="lg" onPress={onSubmit}>
          Large
        </Button>
      </UseCaseSection>
      <UseCaseSection title="Ghost" direction="row">
        <Button variant="ghost" size="sm" onPress={onSubmit}>
          Small
        </Button>
        <Button variant="ghost" size="md" onPress={onSubmit}>
          Medium
        </Button>
        <Button variant="ghost" size="lg" onPress={onSubmit}>
          Large
        </Button>
      </UseCaseSection>
      <UseCaseSection title="With Icons" direction="row">
        <Button size="sm" onPress={onSubmit}>
          <Icon render={Save} />
          Small
        </Button>
        <Button size="md" onPress={onSubmit}>
          <Icon render={Save} />
          Medium
        </Button>
        <Button size="lg" onPress={onSubmit}>
          <Icon render={Save} />
          Large
        </Button>
      </UseCaseSection>
      <UseCaseSection title="States" direction="row">
        <Button onPress={onSubmit} isDisabled>
          Disabled
        </Button>
        <Button onPress={onSubmit} isLoading>
          Loading...
        </Button>
      </UseCaseSection>
    </ComponentScreenLayout>
  );
}
