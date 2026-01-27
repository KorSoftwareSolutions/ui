import { ComponentScreenLayout } from "@/components/component-screen-layout";
import { UseCaseSection } from "@/components/use-case-section";
import { Avatar } from "@korsolutions/ui";
import React from "react";
import { View } from "react-native";

export default function AvatarComponentScreen() {
  return (
    <ComponentScreenLayout title="Avatar">
      <UseCaseSection title="Default">
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Avatar.Root>
            <Avatar.Image
              source={{
                uri: "https://avatars.githubusercontent.com/u/14353231",
              }}
            />
            <Avatar.Fallback>IK</Avatar.Fallback>
          </Avatar.Root>
        </View>
      </UseCaseSection>
      <UseCaseSection title="Text only">
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Avatar.Root>
            <Avatar.Fallback>IK</Avatar.Fallback>
          </Avatar.Root>
        </View>
      </UseCaseSection>
    </ComponentScreenLayout>
  );
}
