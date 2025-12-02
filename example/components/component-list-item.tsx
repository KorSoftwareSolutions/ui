import React from "react";
import { Href, Link } from "expo-router";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "@korsolutions/ui";

export interface ComponentListItemProps {
  href: Href;
  title: string;
}
export function ComponentListItem({ href, title }: ComponentListItemProps) {
  const theme = useTheme();
  return (
    <Link href={href} asChild>
      <TouchableOpacity style={s.container}>
        <Text style={[s.title, { color: theme.colors.foreground }]}>{title}</Text>
        <MaterialCommunityIcons name="chevron-right" size={24} color={theme.colors.foreground} />
      </TouchableOpacity>
    </Link>
  );
}

const s = StyleSheet.create({
  container: {
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
    flex: 1,
  },
});
