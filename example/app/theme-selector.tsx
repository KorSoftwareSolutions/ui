import { Typography, useTheme } from "@korsolutions/ui";
import { Input } from "@korsolutions/ui/components";
import { router } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { useThemeSelection } from "../contexts/theme-context";

export default function ThemeSelectorModal() {
  const theme = useTheme();
  const { currentThemeName, setCurrentTheme, availableThemes } = useThemeSelection();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredThemes = availableThemes.filter((t) => t.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const onClose = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.dismissTo("/");
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Typography
          style={[
            styles.title,
            {
              color: theme.colors.foreground,
              fontFamily: theme.fontFamily,
            },
          ]}
        >
          Select Theme
        </Typography>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Typography
            style={[
              styles.closeText,
              {
                color: theme.colors.mutedForeground,
              },
            ]}
          >
            ✕
          </Typography>
        </TouchableOpacity>
      </View>

      {/* Search Input */}
      <View style={styles.searchContainer}>
        <Input
          placeholder="Search themes..."
          placeholderTextColor={theme.colors.mutedForeground}
          value={searchQuery}
          onChange={setSearchQuery}
          selectionColor={theme.colors.primary}
        />
      </View>

      {/* Theme List */}
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {filteredThemes.map((themeOption) => (
          <TouchableOpacity
            key={themeOption.name}
            style={[
              styles.themeItem,
              {
                backgroundColor: currentThemeName === themeOption.name ? theme.colors.muted : "transparent",
                borderColor: theme.colors.border,
                borderRadius: theme.radius,
              },
            ]}
            onPress={() => setCurrentTheme(themeOption.name)}
          >
            <View style={styles.themeInfo}>
              <Typography
                style={[
                  styles.themeName,
                  {
                    color: theme.colors.foreground,
                    fontFamily: theme.fontFamily,
                  },
                ]}
              >
                {themeOption.name.charAt(0).toUpperCase() + themeOption.name.slice(1)}
              </Typography>
              <View style={styles.colorPreview}>
                <View style={[styles.colorDot, { backgroundColor: themeOption.assets.colors.light.primary }]} />
                <View style={[styles.colorDot, { backgroundColor: themeOption.assets.colors.light.secondary }]} />
                <View style={[styles.colorDot, { backgroundColor: themeOption.assets.colors.light.success }]} />
              </View>
            </View>
            {currentThemeName === themeOption.name && (
              <Typography
                style={[
                  styles.checkmark,
                  {
                    color: theme.colors.primary,
                  },
                ]}
              >
                ✓
              </Typography>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    paddingBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
  },
  closeButton: {
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  closeText: {
    fontSize: 24,
    fontWeight: "300",
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  themeItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 8,
  },
  themeInfo: {
    flex: 1,
    gap: 8,
  },
  themeName: {
    fontSize: 16,
    fontWeight: "500",
  },
  colorPreview: {
    flexDirection: "row",
    gap: 6,
  },
  colorDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
  },
  checkmark: {
    fontSize: 20,
    fontWeight: "600",
    marginLeft: 12,
  },
});
