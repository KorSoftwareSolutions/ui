import { useTheme } from "@korsolutions/ui";
import { Stack } from "expo-router";
import React from "react";

export const unstable_settings = {
  anchor: "index",
};

export default function ComboboxLayout() {
  const theme = useTheme();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: theme.colors.background },
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen
        name="modal"
        options={{
          presentation: "modal",
        }}
      />
    </Stack>
  );
}
