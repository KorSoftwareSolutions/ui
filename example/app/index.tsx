import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { ComponentListItem, ComponentListItemProps } from "@/components/component-list-item";
import { useTheme } from "@korsolutions/ui";
import { MainScreenLayout } from "@/components/main-screen-layout";

const COMPONENTS: ComponentListItemProps[] = [
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
    title: "Text",
    href: "/components/text",
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
  },
  divider: {
    height: 1,
  },
});
