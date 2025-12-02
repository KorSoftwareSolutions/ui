import React from "react";
import { Link } from "expo-router";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "@korsolutions/ui";

interface Props {
  title: string;
  children: React.ReactNode;
}

export function ComponentScreenLayout({ title, children }: Props) {
  const theme = useTheme();
  return (
    <View>
      <View style={s.header}>
        <Link href="/" asChild>
          <TouchableOpacity style={s.backButton}>
            <MaterialCommunityIcons name="chevron-left" size={22} color={theme.colors.primary} />
            <Text style={[s.backButtonLabel, { color: theme.colors.primary }]}>Back</Text>
          </TouchableOpacity>
        </Link>
        <Text style={[s.title, { color: theme.colors.foreground }]}>{title}</Text>
      </View>
      <View style={[s.divider, { backgroundColor: theme.colors.border }]} />
      <ScrollView contentContainerStyle={s.content}>{children}</ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 24,
    gap: 16,
  },
  content: {
    padding: 24,
    gap: 24,
    maxWidth: 600,
    width: "100%",
    alignSelf: "center",
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 8,
  },
  backButtonLabel: {
    fontSize: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  divider: {
    height: 1,
  },
});
