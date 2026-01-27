import { ComponentScreenLayout } from "@/components/component-screen-layout";
import { UseCaseSection } from "@/components/use-case-section";
import { Badge } from "@korsolutions/ui";
import React from "react";
import { View } from "react-native";

export default function BadgeComponentScreen() {
  return (
    <ComponentScreenLayout title="Badge">
      <UseCaseSection title="Default">
        <Badge.Root>
          <Badge.Label>Default</Badge.Label>
        </Badge.Root>
      </UseCaseSection>
      <UseCaseSection title="Secondary">
        <Badge.Root variant="secondary">
          <Badge.Label>Secondary</Badge.Label>
        </Badge.Root>
      </UseCaseSection>
      <UseCaseSection title="Custom Colors">
        <View style={{ gap: 8 }}>
          <Badge.Root color="#10b981">
            <Badge.Label>Success</Badge.Label>
          </Badge.Root>
          <Badge.Root color="#ef4444">
            <Badge.Label>Error</Badge.Label>
          </Badge.Root>
          <Badge.Root color="#f59e0b">
            <Badge.Label>Warning</Badge.Label>
          </Badge.Root>
          <Badge.Root color="#3b82f6">
            <Badge.Label>Info</Badge.Label>
          </Badge.Root>
          <Badge.Root color="#8b5cf6">
            <Badge.Label>Purple</Badge.Label>
          </Badge.Root>
        </View>
      </UseCaseSection>
      <UseCaseSection title="Different Labels">
        <View style={{ gap: 8 }}>
          <Badge.Root>
            <Badge.Label>New</Badge.Label>
          </Badge.Root>
          <Badge.Root variant="secondary">
            <Badge.Label>Beta</Badge.Label>
          </Badge.Root>
          <Badge.Root color="#10b981">
            <Badge.Label>Active</Badge.Label>
          </Badge.Root>
          <Badge.Root color="#6b7280">
            <Badge.Label>Inactive</Badge.Label>
          </Badge.Root>
          <Badge.Root>
            <Badge.Label>v1.0.0</Badge.Label>
          </Badge.Root>
        </View>
      </UseCaseSection>
    </ComponentScreenLayout>
  );
}
