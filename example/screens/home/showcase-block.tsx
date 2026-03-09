import { Card, Typography, useTheme } from "@korsolutions/ui";
import React from "react";
import { StyleSheet, View } from "react-native";

interface ShowcaseBlockProps {
  title: string;
  children: React.ReactNode;
}

export function ShowcaseBlock({ title, children }: ShowcaseBlockProps) {
  const theme = useTheme();
  return (
    <View style={s.container}>
      <Typography
        variant="body-sm"
        style={[s.label, { color: theme.colors.mutedForeground }]}
      >
        {title}
      </Typography>
      <Card.Root>{children}</Card.Root>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    gap: 8,
  },
  label: {
    textTransform: "uppercase",
    letterSpacing: 1,
    fontWeight: "600",
    fontSize: 11,
    paddingLeft: 4,
  },
});
