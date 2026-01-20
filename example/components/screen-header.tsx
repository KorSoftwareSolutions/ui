import { Typography, useTheme } from "@korsolutions/ui";
import { Href, Link } from "expo-router";
import { ChevronLeftIcon, MoonIcon, SunIcon } from "lucide-react-native";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { ThemeSwitcher } from "./theme-switcher";

interface ScreenHeaderProps {
  title: string;
  backHref?: Href;
}

export function ScreenHeader({ title, backHref }: ScreenHeaderProps) {
  /* ******************** Hooks ******************** */
  const theme = useTheme();
  /* ******************** Variables ******************** */
  const ColorSchemeIcon = theme.colorScheme === "light" ? SunIcon : MoonIcon;
  /* ******************** Functions ******************** */
  /* ******************** Effects ******************** */
  /* ******************** JSX ******************** */
  return (
    <View style={s.header}>
      {!!backHref && (
        <Link href={backHref} dismissTo asChild>
          <TouchableOpacity style={s.backButton}>
            <ChevronLeftIcon color={theme.colors.primary} />
            <Typography style={[s.backButtonLabel, { color: theme.colors.primary }]}>Back</Typography>
          </TouchableOpacity>
        </Link>
      )}
      <Typography style={[s.title, { color: theme.colors.foreground }]}>{title}</Typography>
      <View style={s.actions}>
        <ThemeSwitcher />
        <TouchableOpacity onPress={() => theme.setColorScheme(theme.colorScheme === "light" ? "dark" : "light")}>
          <ColorSchemeIcon color={theme.colors.foreground} />
        </TouchableOpacity>
      </View>
    </View>
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
    maxWidth: 600,
    width: "100%",
    alignSelf: "center",
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
