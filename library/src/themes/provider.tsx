import type { DeepPartial } from "@/types/util.types";
import { createContext, type PropsWithChildren, useContext, useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import { defaultThemeAssets } from "./default";
import type { Colors, ColorScheme, FontFamily, FontSize, LetterSpacing, Radius, ThemeAssets } from "./types";
import { mergeThemeAssets } from "./utils";

interface ThemeContext {
  colors: Colors;
  radius: Radius;
  fontFamily: FontFamily;
  colorScheme: ColorScheme;
  letterSpacing: LetterSpacing;
  fontSize: FontSize;
  setColorScheme: (scheme: ColorScheme) => void;
}

const ThemeContext = createContext<ThemeContext | null>(null);

export interface ThemeProviderProps extends PropsWithChildren {
  theme?: DeepPartial<ThemeAssets>;
}

export const ThemeProvider = (props: ThemeProviderProps) => {
  const { children, theme } = props;

  const systemColorScheme = useColorScheme();
  const [colorScheme, setColorScheme] = useState<ColorScheme>(systemColorScheme === "dark" ? "dark" : "light");

  const themeAssets = theme ? mergeThemeAssets(defaultThemeAssets, theme) : defaultThemeAssets;

  const colors = themeAssets.colors[colorScheme];

  useEffect(() => {
    if (systemColorScheme) {
      setColorScheme(systemColorScheme === "dark" ? "dark" : "light");
    }
  }, [systemColorScheme]);

  return (
    <ThemeContext.Provider
      value={{
        colorScheme,
        setColorScheme,
        colors,
        radius: themeAssets.radius,
        fontFamily: themeAssets.fontFamily,
        letterSpacing: themeAssets.letterSpacing,
        fontSize: themeAssets.fontSize,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
