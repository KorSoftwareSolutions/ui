import React from "react";
import { Link } from "expo-router";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface Props {
  title: string;
  children: React.ReactNode;
}

export function ComponentScreenLayout({ title, children }: Props) {
  return (
    <ScrollView contentContainerStyle={s.container}>
      <View style={s.header}>
        <Link href="/" asChild>
          <TouchableOpacity style={s.backButton}>
            <MaterialCommunityIcons name="chevron-left" size={22} color="#007AFF" />
            <Text style={s.backButtonLabel}>Back</Text>
          </TouchableOpacity>
        </Link>
        <Text style={s.title}>{title}</Text>
      </View>
      <View style={s.divider} />
      {children}
    </ScrollView>
  );
}

const s = StyleSheet.create({
  container: {
    padding: 24,
    gap: 24,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 8,
  },
  backButtonLabel: {
    fontSize: 16,
    color: "#007AFF",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  divider: {
    height: 1,
    backgroundColor: "#E0E0E0",
  },
});
