import { ComponentListItem, ComponentListItemProps } from "@/components/component-list-item";
import { MainScreenLayout } from "@/components/main-screen-layout";
import { Card, List, useTheme } from "@korsolutions/ui";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";

const COMPONENTS: ComponentListItemProps[] = [
  {
    title: "Alert Dialog",
    href: "/components/alert-dialog",
  },
  {
    title: "Alert",
    href: "/components/alert",
  },
  {
    title: "Avatar",
    href: "/components/avatar",
  },
  {
    title: "Badge",
    href: "/components/badge",
  },
  {
    title: "Button",
    href: "/components/button",
  },
  {
    title: "Calendar",
    href: "/components/calendar",
  },
  {
    title: "Card",
    href: "/components/card",
  },
  {
    title: "Checkbox",
    href: "/components/checkbox",
  },
  {
    title: "Icon",
    href: "/components/icon",
  },
  {
    title: "Input",
    href: "/components/input",
  },
  {
    title: "Menu",
    href: "/components/menu",
  },
  {
    title: "Select",
    href: "/components/select",
  },
  {
    title: "Field",
    href: "/components/field",
  },
  {
    title: "Typography",
    href: "/components/typography",
  },
  {
    title: "Empty",
    href: "/components/empty",
  },
  {
    title: "Toast",
    href: "/components/toast",
  },
  {
    title: "Textarea",
    href: "/components/textarea",
  },
  {
    title: "Popover",
    href: "/components/popover",
  },
  {
    title: "Progress",
    href: "/components/progress",
  },
  {
    title: "Tabs",
    href: "/components/tabs",
  },
];

export default function Home() {
  const theme = useTheme();

  const sortedComponents = [...COMPONENTS].sort((a, b) => a.title.localeCompare(b.title));
  return (
    <MainScreenLayout title="@korsolutions/ui">
      <ScrollView contentContainerStyle={s.content} style={s.container}>
        <Card.Root>
          <List
            data={sortedComponents}
            keyExtractor={(item) => item.title}
            renderItem={({ item }) => <ComponentListItem {...item} />}
            renderSeparator={() => <View style={{ backgroundColor: theme.colors.border, height: 1 }} />}
          />
        </Card.Root>
        <Card.Root>
          <ComponentListItem title="Theme" href="/theme" />
        </Card.Root>
      </ScrollView>
    </MainScreenLayout>
  );
}

const s = StyleSheet.create({
  container: {
    padding: 24,
  },
  content: {
    overflow: "hidden",
    maxWidth: 600,
    width: "100%",
    alignSelf: "center",
    gap: 24,
  },
});
