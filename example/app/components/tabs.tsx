import { ComponentScreenLayout } from "@/components/component-screen-layout";
import { UseCaseSection } from "@/components/use-case-section";
import { Icon, Tabs } from "@korsolutions/ui";
import React, { useState } from "react";
import { Text, View } from "react-native";
import { Settings, Star, User } from "lucide-react-native";

export default function TabsComponentScreen() {
  return (
    <ComponentScreenLayout title="Tabs">
      <UseCaseSection title="Default variant">
        <DefaultTabsExample />
      </UseCaseSection>

      <UseCaseSection title="Line variant">
        <LineTabsExample />
      </UseCaseSection>

      <UseCaseSection title="With icons">
        <WithIconsExample />
      </UseCaseSection>

      <UseCaseSection title="With disabled tab">
        <WithDisabledTabExample />
      </UseCaseSection>
    </ComponentScreenLayout>
  );
}

function DefaultTabsExample() {
  const [value, setValue] = useState("tab1");

  return (
    <View>
      <Text style={{ marginBottom: 8 }}>Current tab: {value}</Text>
      <Tabs.Root value={value} onChange={setValue}>
        {[
          { value: "tab1", label: "Tab 1" },
          { value: "tab2", label: "Tab 2" },
          { value: "tab3", label: "Tab 3" },
        ].map((tab) => (
          <Tabs.Item key={tab.value} value={tab.value}>
            {tab.label}
          </Tabs.Item>
        ))}
      </Tabs.Root>
    </View>
  );
}

function LineTabsExample() {
  const [value, setValue] = useState("tab1");

  return (
    <View>
      <Text style={{ marginBottom: 8 }}>Current tab: {value}</Text>
      <Tabs.Root variant="line" value={value} onChange={setValue}>
        {[
          { value: "tab1", label: "Tab 1" },
          { value: "tab2", label: "Tab 2" },
          { value: "tab3", label: "Tab 3" },
        ].map((tab) => (
          <Tabs.Item key={tab.value} value={tab.value}>
            {tab.label}
          </Tabs.Item>
        ))}
      </Tabs.Root>
    </View>
  );
}

function WithIconsExample() {
  const [value, setValue] = useState("profile");

  return (
    <View>
      <Tabs.Root value={value} onChange={setValue}>
        <Tabs.Item value="profile">
          <Icon render={User} />
          {"Profile"}
        </Tabs.Item>
        <Tabs.Item value="favorites">
          <Icon render={Star} />
          {"Favorites"}
        </Tabs.Item>
        <Tabs.Item value="settings">
          <Icon render={Settings} />
          {"Settings"}
        </Tabs.Item>
      </Tabs.Root>
    </View>
  );
}

function WithDisabledTabExample() {
  const [value, setValue] = useState("active");

  return (
    <View>
      <Text style={{ marginBottom: 8 }}>Current tab: {value}</Text>
      <Tabs.Root value={value} onChange={setValue}>
        {[
          { value: "active", label: "Active" },
          { value: "disabled", label: "Disabled", disabled: true },
          { value: "another", label: "Another" },
        ].map((tab) => (
          <Tabs.Item key={tab.value} value={tab.value} disabled={tab.disabled}>
            {tab.label}
          </Tabs.Item>
        ))}
      </Tabs.Root>
    </View>
  );
}
