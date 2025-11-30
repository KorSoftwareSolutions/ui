import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { ComponentListItem, ComponentListItemProps } from "@/components/shared/component-list-item";

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
];

export default function Home() {
  return (
    <FlatList
      data={COMPONENTS}
      keyExtractor={(item) => item.title}
      renderItem={({ item }) => <ComponentListItem {...item} />}
      ItemSeparatorComponent={() => <View style={s.divider} />}
      contentContainerStyle={s.content}
      style={s.container}
    />
  );
}

const s = StyleSheet.create({
  container: {
    padding: 24,
  },
  content: {
    backgroundColor: "#FFF",
    borderRadius: 8,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  divider: {
    height: 1,
    backgroundColor: "#E0E0E0",
  },
});
