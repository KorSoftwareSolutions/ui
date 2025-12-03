import { useWindowDimensions } from "react-native";

export type ScreenSize = "mobile" | "tablet" | "desktop";

interface Response {
  readonly size: ScreenSize;
  readonly width: number;
  readonly height: number;
  readonly isMobile: boolean;
  readonly isTablet: boolean;
  readonly isDesktop: boolean;

  select<T>(specifics: ({ [size in ScreenSize]?: T } & { default: T }) | { [platform in ScreenSize]: T }): T;
  select<T>(specifics: { [size in ScreenSize]?: T }): T | undefined;
}

export function useScreenSize(): Response {
  const windowDimensions = useWindowDimensions();

  const size: ScreenSize = windowDimensions.width < 768 ? "mobile" : windowDimensions.width < 1024 ? "tablet" : "desktop";

  return {
    size,
    width: windowDimensions.width,
    height: windowDimensions.height,
    isMobile: size === "mobile",
    isTablet: size === "tablet",
    isDesktop: size === "desktop",
    select: (specifics) => {
      const { mobile, tablet, desktop } = specifics;

      if (size === "mobile" && mobile !== undefined) return mobile;
      if (size === "tablet" && tablet !== undefined) return tablet;
      if (size === "desktop" && desktop !== undefined) return desktop;
      if (!("default" in specifics)) {
        throw new Error(`Utils.$screenSize.select: No value specified for current screen size: ${size}`);
      }
      return specifics.default;
    },
  };
}
