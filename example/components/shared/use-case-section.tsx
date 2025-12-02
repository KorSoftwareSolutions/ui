import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface UseCaseSectionProps {
  title: string;
  children: React.ReactNode;
}

export function UseCaseSection({ title, children }: UseCaseSectionProps) {
  return (
    <View style={s.container}>
      <Text style={s.title}>{title}</Text>
      {children}
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    gap: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "semibold",
  },
});
