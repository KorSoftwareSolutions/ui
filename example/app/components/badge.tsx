import React from "react";
import { Badge } from "@korsolutions/ui/components";
import { ComponentScreenLayout } from "@/components/component-screen-layout";
import { UseCaseSection } from "@/components/use-case-section";
import { View } from "react-native";

export default function BadgeComponentScreen() {
  return (
    <ComponentScreenLayout title="Badge">
      <UseCaseSection title="Default">
        <Badge>Default</Badge>
      </UseCaseSection>
      <UseCaseSection title="Secondary">
        <Badge variant="secondary">Secondary</Badge>
      </UseCaseSection>
      <UseCaseSection title="Custom Colors">
        <View style={{ gap: 8 }}>
          <Badge color="#10b981">Success</Badge>
          <Badge color="#ef4444">Error</Badge>
          <Badge color="#f59e0b">Warning</Badge>
          <Badge color="#3b82f6">Info</Badge>
          <Badge color="#8b5cf6">Purple</Badge>
        </View>
      </UseCaseSection>
      <UseCaseSection title="Different Labels">
        <View style={{ gap: 8 }}>
          <Badge>New</Badge>
          <Badge variant="secondary">Beta</Badge>
          <Badge color="#10b981">Active</Badge>
          <Badge color="#6b7280">Inactive</Badge>
          <Badge>v1.0.0</Badge>
        </View>
      </UseCaseSection>
    </ComponentScreenLayout>
  );
}
