import { useTheme } from "@korsolutions/ui";
import { Href } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScreenHeader } from "./screen-header";

interface Props {
  title: string;
  children: React.ReactNode;
  backHref?: Href;
}

export function ComponentScreenLayout({ title, children, backHref = "/" }: Props) {
  const theme = useTheme();
  return (
    <SafeAreaView edges={["top", "bottom"]} style={s.container}>
      <ScreenHeader title={title} backHref={backHref} />
      <View style={[s.divider, { backgroundColor: theme.colors.border }]} />
      <ScrollView keyboardShouldPersistTaps="handled" automaticallyAdjustKeyboardInsets contentContainerStyle={s.content} style={s.container}>
        {children}
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
  },

  content: {
    flexGrow: 1,
    padding: 24,
    gap: 24,
    maxWidth: 600,
    width: "100%",
    alignSelf: "center",
  },

  divider: {
    height: 1,
  },
});
