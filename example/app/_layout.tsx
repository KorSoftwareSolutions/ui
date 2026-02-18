import { componentsConfig } from "@/utils/theme-components-config";
import {
  UIProvider,
  useReactNavigationTheme,
  useTheme,
} from "@korsolutions/ui";
import { ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import React from "react";
import "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FullWindowOverlay } from "react-native-screens";
import {
  ThemeSelectionProvider,
  useThemeSelection,
} from "../contexts/theme-context";

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
        <Stack.Screen
          name="theme-selector"
          options={{ presentation: "modal" }}
        />
      </Stack>
    </ThemeProvider>
  );
}

function ThemedApp() {
  const { currentTheme } = useThemeSelection();
  const safeAreaInsets = useSafeAreaInsets();

  return (
    <UIProvider
      portalContainer={{
        ios: FullWindowOverlay,
      }}
      theme={currentTheme}
      safeAreaInsets={safeAreaInsets}
      components={componentsConfig}
    >
      <RootRouter />
    </UIProvider>
  );
}

export default function RootLayout() {
  return (
    <ThemeSelectionProvider>
      <ThemedApp />
    </ThemeSelectionProvider>
  );
}
