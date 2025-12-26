import "react-native-reanimated";
import React from "react";
import { Stack } from "expo-router";
import { UniversalUIProvider, useReactNavigationTheme, useTheme } from "@korsolutions/ui";
import { ThemeProvider } from "@react-navigation/native";

function RootRouter() {
  const theme = useTheme();
  const reactNavigationTheme = useReactNavigationTheme();
  return (
    <ThemeProvider value={reactNavigationTheme}>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: theme.colors.background },
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="components" />
      </Stack>
    </ThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <UniversalUIProvider>
      <RootRouter />
    </UniversalUIProvider>
  );
}
