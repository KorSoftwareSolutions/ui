import { ComponentScreenLayout } from "@/components/component-screen-layout";
import { UseCaseSection } from "@/components/use-case-section";
import { IconButton, useTheme } from "@korsolutions/ui";
import { Heart, Mail, Search, Settings, Trash } from "lucide-react-native";
import React from "react";
import { View } from "react-native";

export default function IconButtonComponentScreen() {
  const { colors } = useTheme();

  return (
    <ComponentScreenLayout title="Icon Button">
      <UseCaseSection title="Default">
        <View style={{ flexDirection: "row", gap: 12 }}>
          <IconButton render={Heart} onPress={() => console.log("Heart")} />
          <IconButton render={Settings} onPress={() => console.log("Settings")} />
          <IconButton render={Search} onPress={() => console.log("Search")} />
          <IconButton render={Mail} onPress={() => console.log("Mail")} />
        </View>
      </UseCaseSection>

      <UseCaseSection title="Sizes">
        <View style={{ flexDirection: "row", gap: 12, alignItems: "center" }}>
          <IconButton render={Heart} size="sm" />
          <IconButton render={Heart} size="md" />
          <IconButton render={Heart} size="lg" />
        </View>
      </UseCaseSection>

      <UseCaseSection title="Secondary Sizes">
        <View style={{ flexDirection: "row", gap: 12, alignItems: "center" }}>
          <IconButton render={Settings} variant="secondary" size="sm" />
          <IconButton render={Settings} variant="secondary" size="md" />
          <IconButton render={Settings} variant="secondary" size="lg" />
        </View>
      </UseCaseSection>

      <UseCaseSection title="Ghost Sizes">
        <View style={{ flexDirection: "row", gap: 12, alignItems: "center" }}>
          <IconButton render={Search} variant="ghost" size="sm" />
          <IconButton render={Search} variant="ghost" size="md" />
          <IconButton render={Search} variant="ghost" size="lg" />
        </View>
      </UseCaseSection>

      <UseCaseSection title="Disabled">
        <View style={{ flexDirection: "row", gap: 12 }}>
          <IconButton render={Heart} isDisabled />
          <IconButton render={Settings} isDisabled />
        </View>
      </UseCaseSection>

      <UseCaseSection title="Secondary">
        <View style={{ flexDirection: "row", gap: 12 }}>
          <IconButton render={Heart} variant="secondary" />
          <IconButton render={Settings} variant="secondary" />
          <IconButton render={Search} variant="secondary" />
        </View>
      </UseCaseSection>

      <UseCaseSection title="Secondary Disabled">
        <View style={{ flexDirection: "row", gap: 12 }}>
          <IconButton render={Heart} variant="secondary" isDisabled />
          <IconButton render={Settings} variant="secondary" isDisabled />
        </View>
      </UseCaseSection>

      <UseCaseSection title="Ghost">
        <View style={{ flexDirection: "row", gap: 12 }}>
          <IconButton render={Heart} variant="ghost" />
          <IconButton render={Settings} variant="ghost" />
          <IconButton render={Search} variant="ghost" />
        </View>
      </UseCaseSection>

      <UseCaseSection title="Ghost Disabled">
        <View style={{ flexDirection: "row", gap: 12 }}>
          <IconButton render={Heart} variant="ghost" isDisabled />
          <IconButton render={Settings} variant="ghost" isDisabled />
        </View>
      </UseCaseSection>

      <UseCaseSection title="Custom Color">
        <View style={{ flexDirection: "row", gap: 12 }}>
          <IconButton render={Heart} variant="ghost" color={colors.danger} />
          <IconButton render={Trash} variant="ghost" color={colors.danger} />
        </View>
      </UseCaseSection>
    </ComponentScreenLayout>
  );
}
