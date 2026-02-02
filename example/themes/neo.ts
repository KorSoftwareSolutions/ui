import type { ThemeAssets } from "@korsolutions/ui";

export const neoThemeAssets: ThemeAssets = {
  colors: {
    light: {
      background: "hsl(0, 0%, 100%)",
      foreground: "hsl(0, 0%, 0%)",

      primary: "hsl(0, 100%, 60%)",
      primaryForeground: "hsl(0, 0%, 100%)",

      secondary: "hsl(60, 100%, 50%)",
      secondaryForeground: "hsl(0, 0%, 0%)",

      muted: "hsl(0, 0%, 94%)",
      mutedForeground: "hsl(0, 0%, 20%)",

      border: "hsl(0, 0%, 0%)",
      surface: "hsl(0, 0%, 100%)",

      danger: "hsl(0, 0%, 0%)",
      success: "hsl(120, 100%, 40%)",
      warning: "hsl(60, 100%, 50%)",
      info: "hsl(216, 100%, 50%)",
    },
    dark: {
      background: "hsl(0, 0%, 0%)",
      foreground: "hsl(0, 0%, 100%)",

      primary: "hsl(0, 100%, 70%)",
      primaryForeground: "hsl(0, 0%, 0%)",

      secondary: "hsl(60, 100%, 60%)",
      secondaryForeground: "hsl(0, 0%, 0%)",

      muted: "hsl(0, 0%, 10%)",
      mutedForeground: "hsl(0, 0%, 80%)",

      border: "hsl(0, 0%, 100%)",
      surface: "hsl(0, 0%, 20%)",

      danger: "hsl(0, 0%, 100%)",
      success: "hsl(120, 60%, 50%)",
      warning: "hsl(60, 100%, 60%)",
      info: "hsl(210, 100%, 60%)",
    },
  },
  radius: 0,
  fontFamily: "System",
  letterSpacing: 0,
  fontSize: 16,
};
