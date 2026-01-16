import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "@korsolutions/ui";
import { Href, Link } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Props {
  title: string;
  children: React.ReactNode;
  backHref?: Href;
}

export function ComponentScreenLayout({ title, children, backHref = "/" }: Props) {
  const theme = useTheme();
  return (
    <SafeAreaView edges={["top", "bottom"]} style={s.container}>
      <View style={s.header}>
        <Link href={backHref} dismissTo asChild>
          <TouchableOpacity style={s.backButton}>
            <MaterialCommunityIcons name="chevron-left" size={22} color={theme.colors.primary} />
            <Text style={[s.backButtonLabel, { color: theme.colors.primary }]}>Back</Text>
          </TouchableOpacity>
        </Link>
        <Text style={[s.title, { color: theme.colors.foreground }]}>{title}</Text>
        <View style={s.actions}>
          <TouchableOpacity onPress={() => theme.setColorScheme(theme.colorScheme === "light" ? "dark" : "light")}>
            <MaterialCommunityIcons name="circle-half-full" size={24} color={theme.colors.foreground} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={[s.divider, { backgroundColor: theme.colors.border }]} />
      <ScrollView contentContainerStyle={s.content} style={s.container}>
        {children}
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 24,
    gap: 16,
  },
  content: {
    flexGrow: 1,
    padding: 24,
    gap: 24,
    maxWidth: 600,
    width: "100%",
    alignSelf: "center",
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  backButtonLabel: {
    fontSize: 16,
  },
  title: {
    flex: 1,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  divider: {
    height: 1,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
});
