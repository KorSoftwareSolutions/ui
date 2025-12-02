import { createContext, PropsWithChildren, useContext, useState } from "react";
import { Colors, ThemeName } from "./types";
import { themes } from "./themes";
import { useColorScheme } from "react-native";

interface ThemeContext {
  colors: Colors;
  setTheme: (themeName: ThemeName) => void;
  themeName: ThemeName;
}

const ThemeContext = createContext<ThemeContext | null>(null);

export const ThemeProvider = (props: PropsWithChildren) => {
  const colorScheme = useColorScheme();
  const [themeName, setTheme] = useState<ThemeName>("default");
  const colors = themes[themeName].colors[colorScheme ?? "light"];

  return <ThemeContext.Provider value={{ themeName, setTheme, colors }}>{props.children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
