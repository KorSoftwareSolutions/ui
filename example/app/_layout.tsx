import { UniversalUIProvider, useReactNavigationTheme, useTheme } from "@korsolutions/ui";
import { ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import React from "react";
import "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FullWindowOverlay } from "react-native-screens";
import { ThemeSelectionProvider, useThemeSelection } from "../contexts/theme-context";

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
        <Stack.Screen name="theme" />
        <Stack.Screen name="theme-selector" options={{ presentation: "modal" }} />
      </Stack>
    </ThemeProvider>
  );
}

function ThemedApp() {
  const { currentTheme } = useThemeSelection();
  const safeAreaInsets = useSafeAreaInsets();

  return (
    <UniversalUIProvider
      portalContainer={{
        ios: FullWindowOverlay,
      }}
      theme={currentTheme}
      safeAreaInsets={safeAreaInsets}
    >
      <RootRouter />
    </UniversalUIProvider>
  );
}

export default function RootLayout() {
  return (
    <ThemeSelectionProvider>
      <ThemedApp />
    </ThemeSelectionProvider>
  );
}
