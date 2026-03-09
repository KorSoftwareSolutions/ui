import { useTheme } from "@korsolutions/ui";
import React from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScreenHeader } from "./screen-header";

interface Props {
  children: React.ReactNode;
}

export function MainScreenLayout({ children }: Props) {
  const theme = useTheme();
  return (
    <SafeAreaView edges={["top", "bottom"]} style={s.container}>
      <ScreenHeader />
      <View style={[s.divider, { backgroundColor: theme.colors.border }]} />
      {children}
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
  },
  divider: {
    height: 1,
  },
});
