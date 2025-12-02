import "react-native-reanimated";
import React from "react";
import { Stack } from "expo-router";
import { UniversalUIProvider, useTheme } from "@korsolutions/ui";

function RootRouter() {
  const theme = useTheme();
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: theme.colors.background },
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="components" />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <UniversalUIProvider>
      <RootRouter />
    </UniversalUIProvider>
  );
}
