import { useEffect } from "react";
import { Theme } from "@react-navigation/native";
import { useTheme } from "../provider";
import { Platform } from "react-native";

export function useReactNavigationTheme(): Theme {
  const theme = useTheme();

  useEffect(() => {
    if (Platform.OS !== "web") return;
    const styles = document.createElement("style");
    styles.innerHTML = `
      :root {
        --expo-router-modal-border: 1px solid ${theme.colors.border};
      }
    `;
    document.head.appendChild(styles);
    return () => {
      document.head.removeChild(styles);
    };
  }, [theme.colors.border]);

  return {
    dark: theme.colorScheme === "dark",
    colors: {
      background: theme.colors.background,
      border: theme.colors.border,
      primary: theme.colors.primary,
      card: theme.colors.surface,
      text: theme.colors.foreground,
      notification: theme.colors.danger,
    },
    fonts: {
      heavy: {
        fontFamily: theme.fontFamily,
        fontWeight: "800",
      },
      bold: {
        fontFamily: theme.fontFamily,
        fontWeight: "700",
      },
      medium: {
        fontFamily: theme.fontFamily,
        fontWeight: "500",
      },
      regular: {
        fontFamily: theme.fontFamily,
        fontWeight: "400",
      },
    },
  };
}
