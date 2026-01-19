import type { ThemeAssets } from "@korsolutions/ui";

export const neoThemeAssets: ThemeAssets = {
  colors: {
    light: {
      background: "hsla(0, 0%, 100%, 1)",
      foreground: "hsla(0, 0%, 0%, 1)",

      primary: "hsla(0, 100%, 60%, 1)",
      primaryForeground: "hsla(0, 0%, 100%, 1)",

      secondary: "hsla(60, 100%, 50%, 1)",
      secondaryForeground: "hsla(0, 0%, 0%, 1)",

      muted: "hsla(0, 0%, 94%, 1)",
      mutedForeground: "hsla(0, 0%, 20%, 1)",

      border: "hsla(0, 0%, 0%, 1)",
      surface: "hsla(0, 0%, 100%, 1)",

      danger: "hsla(0, 0%, 0%, 1)",
      success: "hsla(120, 100%, 40%, 1)",
      warning: "hsla(60, 100%, 50%, 1)",
      info: "hsla(216, 100%, 50%, 1)",
    },
    dark: {
      background: "hsla(0, 0%, 0%, 1)",
      foreground: "hsla(0, 0%, 100%, 1)",

      primary: "hsla(0, 100%, 70%, 1)",
      primaryForeground: "hsla(0, 0%, 0%, 1)",

      secondary: "hsla(60, 100%, 60%, 1)",
      secondaryForeground: "hsla(0, 0%, 0%, 1)",

      muted: "hsla(0, 0%, 10%, 1)",
      mutedForeground: "hsla(0, 0%, 80%, 1)",

      border: "hsla(0, 0%, 100%, 1)",
      surface: "hsla(0, 0%, 20%, 1)",

      danger: "hsla(0, 0%, 100%, 1)",
      success: "hsla(120, 60%, 50%, 1)",
      warning: "hsla(60, 100%, 60%, 1)",
      info: "hsla(210, 100%, 60%, 1)",
    },
  },
  radius: 0,
  fontFamily: "System",
  letterSpacing: 0,
  fontSize: 16,
};
