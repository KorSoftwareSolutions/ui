import { ComponentScreenLayout } from "@/components/component-screen-layout";
import { UseCaseSection } from "@/components/use-case-section";
import { Icon, Typography, useTheme } from "@korsolutions/ui";
import { Bell, Check, Heart, Home, Mail, MessageCircle, Search, Settings, Star, User } from "lucide-react-native";
import React from "react";
import { View } from "react-native";

export default function IconComponentScreen() {
  const { colors } = useTheme();

  return (
    <ComponentScreenLayout title="Icon">
      <UseCaseSection title="Basic Icons">
        <View style={{ flexDirection: "row", gap: 16, flexWrap: "wrap" }}>
          <Icon render={Heart} />
          <Icon render={Settings} />
          <Icon render={User} />
          <Icon render={Star} />
          <Icon render={Bell} />
          <Icon render={MessageCircle} />
        </View>
      </UseCaseSection>

      <UseCaseSection title="Custom Colors">
        <View style={{ flexDirection: "row", gap: 16, flexWrap: "wrap" }}>
          <Icon render={Heart} color={colors.danger} />
          <Icon render={Check} color={colors.success} />
          <Icon render={Mail} color={colors.primary} />
          <Icon render={Bell} color={colors.warning} />
        </View>
      </UseCaseSection>

      <UseCaseSection title="Custom Sizes">
        <View style={{ flexDirection: "row", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
          <Icon render={Home} size={16} />
          <Icon render={Home} size={24} />
          <Icon render={Home} size={32} />
          <Icon render={Home} size={48} />
          <Icon render={Home} size={64} />
        </View>
      </UseCaseSection>

      <UseCaseSection title="Custom Stroke Width">
        <View style={{ flexDirection: "row", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
          <Icon render={Search} strokeWidth={1} size={32} />
          <Icon render={Search} strokeWidth={1.5} size={32} />
          <Icon render={Search} strokeWidth={2} size={32} />
          <Icon render={Search} strokeWidth={2.5} size={32} />
          <Icon render={Search} strokeWidth={3} size={32} />
        </View>
      </UseCaseSection>
      <UseCaseSection title="With Text">
        <View style={{ flexDirection: "row", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
          <Icon render={Mail} />
          <Typography>You have new messages!</Typography>
        </View>
      </UseCaseSection>
    </ComponentScreenLayout>
  );
}
