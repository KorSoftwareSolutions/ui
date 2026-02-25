import { useEffect, useState } from "react";
import { useColorScheme as useSystemColorScheme } from "react-native";
import type { ColorScheme, StorageClient } from "../themes/types";

const getColorScheme = (
  storageGetCallback?: () => ColorScheme | null,
  systemColorScheme?: ReturnType<typeof useSystemColorScheme>,
): ColorScheme => {
  if (storageGetCallback) {
    const storedScheme = storageGetCallback();
    if (storedScheme) return storedScheme;
  }
  if (systemColorScheme) {
    return systemColorScheme === "dark" ? "dark" : "light";
  }
  return "light";
};

interface UseColorSchemeProps {
  colorSchemeStorage?: StorageClient<ColorScheme>;
}

export function useColorScheme({ colorSchemeStorage }: UseColorSchemeProps) {
  const systemColorScheme = useSystemColorScheme();
  const [_colorScheme, _setColorScheme] = useState<ColorScheme>(
    getColorScheme(colorSchemeStorage?.get, systemColorScheme),
  );

  const setColorScheme = (scheme: ColorScheme) => {
    _setColorScheme(scheme);
    colorSchemeStorage?.set(scheme);
  };

  useEffect(() => {
    const newScheme = getColorScheme(
      colorSchemeStorage?.get,
      systemColorScheme,
    );
    if (newScheme === _colorScheme) return;
    setColorScheme(newScheme);
  }, [systemColorScheme]);

  return { colorScheme: _colorScheme, setColorScheme };
}
