import { ComponentScreenLayout } from "@/components/component-screen-layout";
import { UseCaseSection } from "@/components/use-case-section";
import { Separator, Typography } from "@korsolutions/ui";
import React from "react";
import { View } from "react-native";

export default function SeparatorComponentScreen() {
  return (
    <ComponentScreenLayout title="Separator">
      <UseCaseSection title="Horizontal">
        <View style={{ gap: 12 }}>
          <Typography>Above</Typography>
          <Separator />
          <Typography>Below</Typography>
        </View>
      </UseCaseSection>

      <UseCaseSection title="Vertical">
        <View style={{ flexDirection: "row", alignItems: "center", gap: 12, height: 40 }}>
          <Typography>Left</Typography>
          <Separator variant="vertical" />
          <Typography>Right</Typography>
        </View>
      </UseCaseSection>

      <UseCaseSection title="In a List">
        <View>
          <Typography>Item 1</Typography>
          <Separator />
          <Typography>Item 2</Typography>
          <Separator />
          <Typography>Item 3</Typography>
        </View>
      </UseCaseSection>
    </ComponentScreenLayout>
  );
}
