import { ComponentScreenLayout } from "@/components/component-screen-layout";
import { UseCaseSection } from "@/components/use-case-section";
import { Tabs } from "@korsolutions/ui/components";
import React from "react";
import { Text, View } from "react-native";

export default function TabsComponentScreen() {
  return (
    <ComponentScreenLayout title="Tabs">
      <UseCaseSection title="Default variant">
        <Tabs
          tabs={[
            { value: "account", label: "Account" },
            { value: "password", label: "Password" },
            { value: "settings", label: "Settings" },
          ]}
        />
      </UseCaseSection>

      <UseCaseSection title="Line variant">
        <Tabs
          variant="line"
          tabs={[
            { value: "overview", label: "Overview" },
            { value: "analytics", label: "Analytics" },
            { value: "reports", label: "Reports" },
          ]}
        />
      </UseCaseSection>

      <UseCaseSection title="With disabled tab">
        <Tabs
          tabs={[
            { value: "active", label: "Active" },
            { value: "disabled", label: "Disabled", disabled: true },
            { value: "another", label: "Another" },
          ]}
        />
      </UseCaseSection>

      <UseCaseSection title="Controlled tabs">
        <ControlledTabsExample />
      </UseCaseSection>
    </ComponentScreenLayout>
  );
}

function ControlledTabsExample() {
  const [value, setValue] = React.useState("tab1");

  return (
    <View>
      <Text style={{ marginBottom: 8 }}>Current tab: {value}</Text>
      <Tabs
        value={value}
        onChange={setValue}
        tabs={[
          { value: "tab1", label: "Tab 1" },
          { value: "tab2", label: "Tab 2" },
          { value: "tab3", label: "Tab 3" },
        ]}
      />
    </View>
  );
}
