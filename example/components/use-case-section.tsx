import { useTheme } from "@korsolutions/ui";
import React from "react";
import { StyleSheet, Text, View, ViewStyle } from "react-native";

interface UseCaseSectionProps {
  title: string;
  children: React.ReactNode;
  direction?: "row" | "column";
  style?: ViewStyle;
}

export function UseCaseSection({
  title,
  children,
  direction = "column",
  style,
}: UseCaseSectionProps) {
  const theme = useTheme();
  return (
    <View style={s.container}>
      <Text style={[s.title, { color: theme.colors.primary }]}>{title}</Text>
      <View
        style={[
          {
            flexDirection: direction,
            gap: 16,
            alignItems: direction === "row" ? "center" : undefined,
          },
          style,
        ]}
      >
        {children}
      </View>
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
