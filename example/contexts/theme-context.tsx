import { LocalStorageService } from "@/services/LocalStorageService";
import { defaultThemeAssets, type ThemeAssets } from "@korsolutions/ui";
import { createContext, useContext, useEffect, useState, type PropsWithChildren } from "react";
import { claudeThemeAssets, neoThemeAssets, twitterThemeAssets } from "../themes";

interface ThemeOption {
  name: string;
  assets: ThemeAssets;
}

interface ThemeSelectionContextValue {
  currentTheme: ThemeAssets;
  currentThemeName: string;
  setCurrentTheme: (name: string) => void;
  availableThemes: ThemeOption[];
}

const ThemeSelectionContext = createContext<ThemeSelectionContextValue | null>(null);

const AVAILABLE_THEMES: ThemeOption[] = [
  { name: "default", assets: defaultThemeAssets },
  { name: "claude", assets: claudeThemeAssets },
  { name: "neo", assets: neoThemeAssets },
  { name: "twitter", assets: twitterThemeAssets },
];

export function ThemeSelectionProvider({ children }: PropsWithChildren) {
  const [currentThemeName, setCurrentThemeName] = useState("default");
  const currentTheme = AVAILABLE_THEMES.find((t) => t.name === currentThemeName)?.assets ?? AVAILABLE_THEMES[0].assets;

  const setCurrentTheme = (name: string) => {
    setCurrentThemeName(name);
    LocalStorageService.setItem("CURRENT_THEME", name);
  };

  useEffect(() => {
    LocalStorageService.getItem("CURRENT_THEME").then((storedTheme) => {
      if (storedTheme) {
        setCurrentThemeName(storedTheme);
      }
    });
  }, []);

  return (
    <ThemeSelectionContext.Provider
      value={{
        currentTheme,
        currentThemeName,
        setCurrentTheme,
        availableThemes: AVAILABLE_THEMES,
      }}
    >
      {children}
    </ThemeSelectionContext.Provider>
  );
}

export function useThemeSelection() {
  const context = useContext(ThemeSelectionContext);
  if (!context) {
    throw new Error("useThemeSelection must be used within ThemeSelectionProvider");
  }
  return context;
}
