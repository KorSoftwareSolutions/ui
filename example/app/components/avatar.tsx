import React from "react";
import { ComponentScreenLayout } from "@/components/component-screen-layout";
import { Avatar } from "@korsolutions/ui/components";
import { UseCaseSection } from "@/components/use-case-section";
import { View } from "react-native";

export default function AvatarComponentScreen() {
  return (
    <ComponentScreenLayout title="Avatar">
      <UseCaseSection title="Default">
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Avatar
            source={{
              uri: "https://avatars.githubusercontent.com/u/14353231",
            }}
            fallback="IK"
          />
        </View>
      </UseCaseSection>
      <UseCaseSection title="Text only">
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Avatar fallback="IK" />
        </View>
      </UseCaseSection>
    </ComponentScreenLayout>
  );
}
