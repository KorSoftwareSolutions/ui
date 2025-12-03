import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import { Colors, ColorScheme, FontFamily, LetterSpacing, Radius, ThemeName } from "./types";
import { themes } from "./themes";
import { useColorScheme } from "react-native";

interface ThemeContext {
  colors: Colors;
  radius: Radius;
  fontFamily: FontFamily;
  colorScheme: ColorScheme;
  letterSpacing: LetterSpacing;
  setColorScheme: (scheme: ColorScheme) => void;
  setTheme: (themeName: ThemeName) => void;
  themeName: ThemeName;
}

const ThemeContext = createContext<ThemeContext | null>(null);

export const ThemeProvider = (props: PropsWithChildren) => {
  const [themeName, setTheme] = useState<ThemeName>("default");

  const systemColorScheme = useColorScheme();
  const [colorScheme, setColorScheme] = useState<ColorScheme>(systemColorScheme ?? "light");

  const themesAssets = themes[themeName];
  const colors = themesAssets.colors[colorScheme];

  useEffect(() => {
    if (systemColorScheme) {
      setColorScheme(systemColorScheme);
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
