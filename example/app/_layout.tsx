import { UniversalUIProvider, useReactNavigationTheme, useTheme } from "@korsolutions/ui";
import { ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import React from "react";
import "react-native-reanimated";
import { FullWindowOverlay } from "react-native-screens";

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
    <UniversalUIProvider
      portalContainer={{
        ios: FullWindowOverlay,
      }}
    >
      <RootRouter />
    </UniversalUIProvider>
  );
}
