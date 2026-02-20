import { ComponentScreenLayout } from "@/components/component-screen-layout";
import { UseCaseSection } from "@/components/use-case-section";
import { Badge, Icon } from "@korsolutions/ui";
import { BookmarkIcon, VerifiedIcon } from "lucide-react-native";
import React from "react";
import { View } from "react-native";

export default function BadgeComponentScreen() {
  return (
    <ComponentScreenLayout title="Badge">
      <UseCaseSection title="Default Variants">
        <Badge>Default</Badge>
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
      <UseCaseSection title="With Icons">
        <View style={{ gap: 8 }}>
          <Badge>
            <Icon render={VerifiedIcon} />
            Verified
          </Badge>
          <Badge color="#10b981">
            Bookmarked
            <Icon render={BookmarkIcon} />
          </Badge>
        </View>
      </UseCaseSection>
    </ComponentScreenLayout>
  );
}
