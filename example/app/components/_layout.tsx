import { ComponentSidebar } from "@/components/component-sidebar";
import { useScreenSize, useTheme } from "@korsolutions/ui";
import { Stack, usePathname } from "expo-router";
import React from "react";
import { Platform, View } from "react-native";

export default function ComponentsLayout() {
  const theme = useTheme();
  const screenSize = useScreenSize();
  const pathname = usePathname();
  const shouldShowSidebar = Platform.OS === "web" && screenSize.isDesktop;

  return (
    <View style={{ flex: 1, flexDirection: "row" }}>
      {shouldShowSidebar && <ComponentSidebar currentPath={pathname} />}
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: theme.colors.background },
        }}
      />
    </View>
  );
}
