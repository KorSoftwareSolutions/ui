import { createContext, type PropsWithChildren, useContext } from "react";
import type { ToastVariants } from "../components/toast/variants";
import { useColorScheme } from "../hooks/use-color-scheme";
import type { SvgProps } from "../types/props.types";
import type { DeepPartial } from "../types/util.types";
import { defaultThemeAssets } from "./default";
import type {
  Colors,
  ColorScheme,
  FontFamily,
  FontSize,
  LetterSpacing,
  Radius,
  StorageClient,
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

export interface ComponentsConfig {
  colorScheme?: {
    storage?: StorageClient<ColorScheme>;
  };
  toast?: {
    icons?: Partial<
      Record<keyof typeof ToastVariants, React.ComponentType<SvgProps>>
    >;
  };
  menu?: {
    selectionIcon?: React.ComponentType<SvgProps>;
  };
  calendar?: {
    prevIcon?: React.ComponentType<SvgProps>;
    nextIcon?: React.ComponentType<SvgProps>;
  };
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

  const themeAssets = theme
    ? mergeThemeAssets(defaultThemeAssets, theme)
    : defaultThemeAssets;

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

export const useComponentsConfig = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useComponentsConfig must be used within a ThemeProvider");
  }
  return context.components;
};
