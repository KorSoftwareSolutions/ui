import { createContext, type PropsWithChildren, useContext } from "react";
import { useColorScheme } from "../hooks/use-color-scheme";
import type { DeepPartial } from "../types/util.types";
import { defaultThemeAssets } from "./default";
import type {
  Colors,
  ColorScheme,
  ComponentsConfig,
  FontFamily,
  FontSize,
  LetterSpacing,
  Radius,
  ThemeAssets,
} from "./types";
import { mergeThemeAssets } from "./utils";

interface ThemeContext {
  colors: Colors;
  radius: Radius;
  fontFamily: FontFamily;
  colorScheme: ColorScheme;
  letterSpacing: LetterSpacing;
  fontSize: FontSize;
  setColorScheme: (scheme: ColorScheme) => void;
  components?: ComponentsConfig;
}

const ThemeContext = createContext<ThemeContext | null>(null);

export interface ThemeProviderProps extends PropsWithChildren {
  theme?: DeepPartial<ThemeAssets>;
  components?: ComponentsConfig;
}

export const ThemeProvider = (props: ThemeProviderProps) => {
  const { children, theme, components } = props;
  const { colorScheme, setColorScheme } = useColorScheme({
    colorSchemeStorage: components?.colorScheme?.storage,
  });

  const themeAssets = theme ? mergeThemeAssets(defaultThemeAssets, theme) : defaultThemeAssets;

  const colors = themeAssets.colors[colorScheme];

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
        components,
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

const useComponentsConfig = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useComponentsConfig must be used within a ThemeProvider");
  }
  return context.components;
};

export const useComponentConfig = <K extends keyof ComponentsConfig>(componentName: K) => {
  const componentsConfig = useComponentsConfig();
  return componentsConfig?.[componentName];
};
