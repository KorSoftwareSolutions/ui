import { useTheme } from "@korsolutions/ui";
import { Stack } from "expo-router";
import React from "react";

export default function ComponentsLayout() {
  const theme = useTheme();
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: theme.colors.background },
      }}
    />
  );
}
