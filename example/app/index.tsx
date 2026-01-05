import { ComponentListItem, ComponentListItemProps } from "@/components/component-list-item";
import { MainScreenLayout } from "@/components/main-screen-layout";
import { useTheme } from "@korsolutions/ui";
import React from "react";
import { FlatList, StyleSheet, View } from "react-native";

const COMPONENTS: ComponentListItemProps[] = [
  {
    title: "Alert Dialog",
    href: "/components/alert-dialog",
  },
  {
    title: "Input",
    href: "/components/input",
  },
  {
    title: "Button",
    href: "/components/button",
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
    title: "Card",
    href: "/components/card",
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
    title: "Avatar",
    href: "/components/avatar",
  },
  {
    title: "Toast",
    href: "/components/toast",
  },
  {
    title: "Badge",
    href: "/components/badge",
  },
  {
    title: "Textarea",
    href: "/components/textarea",
  },
  {
    title: "Dropdown Menu",
    href: "/components/dropdown-menu",
  },
  {
    title: "Popover",
    href: "/components/popover",
  },
  {
    title: "Calendar",
    href: "/components/calendar",
  },
  {
    title: "Tabs",
    href: "/components/tabs",
  },
  {
    title: "Checkbox",
    href: "/components/checkbox",
  },
];

export default function Home() {
  const theme = useTheme();
  return (
    <MainScreenLayout title="Components">
      <FlatList
        data={COMPONENTS}
        keyExtractor={(item) => item.title}
        renderItem={({ item }) => <ComponentListItem {...item} />}
        ItemSeparatorComponent={() => (
          <View
            style={[
              s.divider,
              {
                backgroundColor: theme.colors.border,
              },
            ]}
          />
        )}
        contentContainerStyle={[
          s.content,
          {
            backgroundColor: theme.colors.surface,
            borderColor: theme.colors.border,
          },
        ]}
        style={s.container}
      />
    </MainScreenLayout>
  );
}

const s = StyleSheet.create({
  container: {
    padding: 24,
  },
  content: {
    borderRadius: 8,
    overflow: "hidden",
    borderWidth: 1,
    maxWidth: 600,
    width: "100%",
    alignSelf: "center",
  },
  divider: {
    height: 1,
  },
});
