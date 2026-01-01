import { createContext, type PropsWithChildren, useContext, useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import { themes } from "./themes";
import type { Colors, ColorScheme, FontFamily, FontSize, LetterSpacing, Radius, ThemeName } from "./types";

interface ThemeContext {
  colors: Colors;
  radius: Radius;
  fontFamily: FontFamily;
  colorScheme: ColorScheme;
  letterSpacing: LetterSpacing;
  fontSize: FontSize;
  setColorScheme: (scheme: ColorScheme) => void;
  setTheme: (themeName: ThemeName) => void;
  themeName: ThemeName;
}

const ThemeContext = createContext<ThemeContext | null>(null);

export const ThemeProvider = (props: PropsWithChildren) => {
  const [themeName, setTheme] = useState<ThemeName>("default");

  const systemColorScheme = useColorScheme();
  const [colorScheme, setColorScheme] = useState<ColorScheme>(systemColorScheme === "dark" ? "dark" : "light");

  const themesAssets = themes[themeName];
  const colors = themesAssets.colors[colorScheme];

  useEffect(() => {
    if (systemColorScheme) {
      setColorScheme(systemColorScheme === "dark" ? "dark" : "light");
    }
  }, [systemColorScheme]);

  return (
    <ThemeContext.Provider
      value={{
        themeName,
        setTheme,
        colorScheme,
        setColorScheme,
        colors,
        radius: themesAssets.radius,
        fontFamily: themesAssets.fontFamily,
        letterSpacing: themesAssets.letterSpacing,
        fontSize: themesAssets.fontSize,
      }}
    >
      {props.children}
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
