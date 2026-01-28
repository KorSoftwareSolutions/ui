import { COMPONENTS } from "@/constants/components";
import { ScrollBar, Typography, useTheme } from "@korsolutions/ui";
import { Href, Link } from "expo-router";
import React from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";

interface ComponentSidebarProps {
  currentPath: string;
}

export function ComponentSidebar({ currentPath }: ComponentSidebarProps) {
  const theme = useTheme();
  const sortedComponents = [...COMPONENTS].sort((a, b) => a.title.localeCompare(b.title));

  return (
    <View
      style={[
        styles.sidebar,
        {
          backgroundColor: theme.colors.surface,
          borderRightColor: theme.colors.border,
        },
      ]}
    >
      <View style={[styles.header, { borderBottomColor: theme.colors.border }]}>
        <Typography variant="heading-md">Components</Typography>
      </View>
      <ScrollBar />
      <ScrollView style={styles.list}>
        {sortedComponents.map((component) => (
          <SidebarItem key={String(component.href)} title={component.title} href={component.href} isActive={currentPath === String(component.href)} />
        ))}
      </ScrollView>
    </View>
  );
}

interface SidebarItemProps {
  title: string;
  href: Href;
  isActive: boolean;
}

function SidebarItem({ title, href, isActive }: SidebarItemProps) {
  const theme = useTheme();

  return (
    <Link href={href} asChild style={[styles.item, isActive && { backgroundColor: theme.colors.muted }]}>
      <Pressable>
        <Typography style={{ color: isActive ? theme.colors.primary : theme.colors.foreground }}>{title}</Typography>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  sidebar: {
    width: 260,
    borderRightWidth: 1,
    height: "100%",
  },
  header: {
    padding: 24,
    borderBottomWidth: 1,
  },
  list: {
    flex: 1,
  },
  item: {
    padding: 12,
    paddingHorizontal: 24,
  },
});
