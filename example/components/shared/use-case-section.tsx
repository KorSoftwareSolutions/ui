import { useTheme } from "@korsolutions/ui";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface UseCaseSectionProps {
  title: string;
  children: React.ReactNode;
}

export function UseCaseSection({ title, children }: UseCaseSectionProps) {
  const theme = useTheme();
  return (
    <View style={s.container}>
      <Text style={[s.title, { color: theme.colors.primary }]}>{title}</Text>
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
