import type { Theme } from "@react-navigation/native";
import { useEffect } from "react";
import { Platform } from "react-native";
import { useTheme } from "../provider";

export function useReactNavigationTheme(): Theme {
  const theme = useTheme();

  useEffect(() => {
    if (Platform.OS !== "web") return;
    const styles = document.createElement("style");
    styles.id = "korsolutions-ui-react-navigation-theme";
    styles.innerHTML = `
      :root {
        --expo-router-modal-border: 1px solid ${theme.colors.border};
        --expo-router-modal-border-radius: ${theme.radius}px;
      }
    `;
    document.head.appendChild(styles);
    return () => {
      document.head.removeChild(styles);
    };
  }, [theme.colors.border, theme.radius]);

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
