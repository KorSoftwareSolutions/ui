import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "@korsolutions/ui";

interface Props {
  title: string;
  children: React.ReactNode;
}

export function MainScreenLayout({ title, children }: Props) {
  const theme = useTheme();
  return (
    <View>
      <View style={s.header}>
        <Text style={[s.title, { color: theme.colors.foreground }]}>{title}</Text>
        <View style={s.actions}>
          <TouchableOpacity onPress={() => theme.setColorScheme(theme.colorScheme === "light" ? "dark" : "light")}>
            <MaterialCommunityIcons name="circle-half-full" size={24} color={theme.colors.foreground} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={[s.divider, { backgroundColor: theme.colors.border }]} />
      <ScrollView contentContainerStyle={s.content}>{children}</ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 24,
    gap: 16,
  },
  content: {
    padding: 24,
    gap: 24,
    maxWidth: 600,
    width: "100%",
    alignSelf: "center",
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
