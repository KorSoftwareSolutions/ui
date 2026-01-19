import type { ThemeAssets } from "@korsolutions/ui";

export const claudeThemeAssets: ThemeAssets = {
  colors: {
    light: {
      background: "hsla(48, 33%, 97%, 1)",
      foreground: "hsla(48, 20%, 20%, 1)",

      primary: "hsla(15, 56%, 52%, 1)",
      primaryForeground: "hsla(0, 0%, 100%, 1)",

      secondary: "hsla(46, 23%, 89%, 1)",
      secondaryForeground: "hsla(51, 8%, 30%, 1)",

      muted: "hsla(44, 29%, 90%, 1)",
      mutedForeground: "hsla(50, 2%, 50%, 1)",

      border: "hsla(50, 8%, 84%, 1)",
      surface: "hsla(48, 33%, 97%, 1)",

      danger: "hsla(60, 3%, 8%, 1)",
      success: "hsla(147, 78%, 42%, 1)",
      warning: "hsla(42, 93%, 56%, 1)",
      info: "hsla(252, 85%, 75%, 1)",
    },
    dark: {
      background: "hsla(60, 3%, 15%, 1)",
      foreground: "hsla(46, 10%, 74%, 1)",

      primary: "hsla(15, 63%, 60%, 1)",
      primaryForeground: "hsla(0, 0%, 100%, 1)",

      secondary: "hsla(48, 33%, 97%, 1)",
      secondaryForeground: "hsla(60, 2%, 18%, 1)",

      muted: "hsla(60, 4%, 10%, 1)",
      mutedForeground: "hsla(51, 9%, 69%, 1)",

      border: "hsla(60, 5%, 23%, 1)",
      surface: "hsla(60, 2%, 18%, 1)",

      danger: "hsla(0, 84%, 60%, 1)",
      success: "hsla(147, 78%, 42%, 1)",
      warning: "hsla(42, 93%, 56%, 1)",
      info: "hsla(252, 85%, 75%, 1)",
    },
  },
  radius: 8,
  fontFamily: "System",
  letterSpacing: 0,
  fontSize: 16,
};
