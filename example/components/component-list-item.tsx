import { Icon, useTheme } from "@korsolutions/ui";
import { Href, Link } from "expo-router";
import { ChevronRight } from "lucide-react-native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

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
        <Icon render={ChevronRight} size={24} color={theme.colors.foreground} />
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
