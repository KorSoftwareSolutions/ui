import type { ThemeAssets } from "@korsolutions/ui";

export const twitterThemeAssets: ThemeAssets = {
  colors: {
    light: {
      background: "hsl(0, 0%, 100%)",
      foreground: "hsl(210, 25%, 8%)",

      primary: "hsl(204, 88%, 53%)",
      primaryForeground: "hsl(0, 0%, 100%)",

      secondary: "hsl(210, 25%, 8%)",
      secondaryForeground: "hsl(0, 0%, 100%)",

      muted: "hsl(240, 2%, 90%)",
      mutedForeground: "hsl(210, 25%, 8%)",

      border: "hsl(201, 30%, 91%)",
      surface: "hsl(180, 7%, 97%)",

      danger: "hsl(356, 91%, 54%)",
      success: "hsl(147, 78%, 42%)",
      warning: "hsl(42, 93%, 56%)",
      info: "hsl(204, 88%, 53%)",
    },
    dark: {
      background: "hsl(0, 0%, 0%)",
      foreground: "hsl(200, 7%, 91%)",

      primary: "hsl(204, 88%, 53%)",
      primaryForeground: "hsl(0, 0%, 100%)",

      secondary: "hsl(195, 15%, 95%)",
      secondaryForeground: "hsl(210, 25%, 8%)",

      muted: "hsl(0, 0%, 9%)",
      mutedForeground: "hsl(210, 3%, 46%)",

      border: "hsl(210, 5%, 15%)",
      surface: "hsl(228, 10%, 10%)",

      danger: "hsl(356, 91%, 54%)",
      success: "hsl(147, 78%, 42%)",
      warning: "hsl(42, 93%, 56%)",
      info: "hsl(204, 88%, 53%)",
    },
  },
  radius: 21,
  fontFamily: "System",
  letterSpacing: 0,
  fontSize: 16,
};
