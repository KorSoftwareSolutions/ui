import type { ThemeAssets } from "@korsolutions/ui";

export const claudeThemeAssets: ThemeAssets = {
  colors: {
    light: {
      background: "hsl(48, 33%, 97%)",
      foreground: "hsl(48, 20%, 20%)",

      primary: "hsl(15, 56%, 52%)",
      primaryForeground: "hsl(0, 0%, 100%)",

      secondary: "hsl(46, 23%, 89%)",
      secondaryForeground: "hsl(51, 8%, 30%)",

      muted: "hsl(44, 29%, 90%)",
      mutedForeground: "hsl(50, 2%, 50%)",

      border: "hsl(50, 8%, 84%)",
      surface: "hsl(48, 33%, 97%)",

      danger: "hsl(60, 3%, 8%)",
      success: "hsl(147, 78%, 42%)",
      warning: "hsl(42, 93%, 56%)",
      info: "hsl(252, 85%, 75%)",
    },
    dark: {
      background: "hsl(60, 3%, 15%)",
      foreground: "hsl(46, 10%, 74%)",

      primary: "hsl(15, 63%, 60%)",
      primaryForeground: "hsl(0, 0%, 100%)",

      secondary: "hsl(48, 33%, 97%)",
      secondaryForeground: "hsl(60, 2%, 18%)",

      muted: "hsl(60, 4%, 10%)",
      mutedForeground: "hsl(51, 9%, 69%)",

      border: "hsl(60, 5%, 23%)",
      surface: "hsl(60, 2%, 18%)",

      danger: "hsl(0, 84%, 60%)",
      success: "hsl(147, 78%, 42%)",
      warning: "hsl(42, 93%, 56%)",
      info: "hsl(252, 85%, 75%)",
    },
  },
  radius: 8,
  fontFamily: "System",
  letterSpacing: 0,
  fontSize: 16,
};
