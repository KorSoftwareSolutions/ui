import { GithubIcon } from "@/assets/icons/GithubIcon";
import { KorUIIcon } from "@/assets/icons/KorUIIcon";
import { IconButton, Separator, Typography, useTheme } from "@korsolutions/ui";
import { Link } from "expo-router";
import { MoonIcon, PencilRulerIcon, SunIcon } from "lucide-react-native";
import React from "react";
import { Linking, Platform, StyleSheet, TouchableOpacity, View } from "react-native";

const GITHUB_URL = "https://github.com/korsoftwaresolutions/ui";

export function ScreenHeader() {
  const theme = useTheme();
  const ColorSchemeIcon = theme.colorScheme === "light" ? SunIcon : MoonIcon;

  const openGithub = () => {
    if (Platform.OS === "web") {
      window.open(GITHUB_URL, "_blank");
    } else {
      Linking.openURL(GITHUB_URL);
    }
  };

  return (
    <View style={s.header}>
      <Link href="/" asChild>
        <TouchableOpacity style={s.logoContainer}>
          <KorUIIcon size={28} style={s.logo} />
          <Typography style={[s.packageName, { color: theme.colors.foreground }]}>
            @korsolutions/ui
          </Typography>
        </TouchableOpacity>
      </Link>
      <View style={s.actions}>
        <IconButton render={GithubIcon} variant="ghost" onPress={openGithub} size={24} />
        <Separator variant="vertical" />
        <Link href="/theme-selector" asChild>
          <IconButton render={PencilRulerIcon} variant="ghost" size={24} />
        </Link>
        <Separator variant="vertical" />
        <IconButton
          render={ColorSchemeIcon}
          variant="ghost"
          onPress={() => theme.setColorScheme(theme.colorScheme === "light" ? "dark" : "light")}
          size={24}
        />
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingVertical: 16,
    width: "100%",
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  logo: {
    width: 28,
    height: 28,
    borderRadius: 6,
  },
  packageName: {
    fontSize: 16,
    fontWeight: "700",
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
});
