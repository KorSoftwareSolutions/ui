import { Link } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

interface Props {
  title: string;
  children: React.ReactNode;
}

export function ComponentScreenLayout({ title, children }: Props) {
  return (
    <ScrollView contentContainerStyle={s.container}>
      <View style={s.header}>
        <Link href="/" style={s.backLink}>
          Back
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
    gap: 24,
  },
  backLink: {
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
