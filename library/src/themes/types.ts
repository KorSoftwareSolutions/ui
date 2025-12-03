export type ThemeName = "default";
export type ColorScheme = "light" | "dark";

type Color = `hsla(${number}, ${number}%, ${number}%, ${number})`;

export interface Colors {
  background: Color;
  foreground: Color;
  primary: Color;
  primaryForeground: Color;
  secondary: Color;
  secondaryForeground: Color;
  muted: Color;
  mutedForeground: Color;
  border: Color;
  surface: Color;
  success: Color;
  warning: Color;
  danger: Color;
  info: Color;
}

export type Radius = number;
export type FontFamily = string;
export type LetterSpacing = number;
export type FontSize = number;

export interface ThemeAssets {
  colors: Record<ColorScheme, Colors>;
  radius: Radius;
  fontFamily: FontFamily;
  letterSpacing: LetterSpacing;
  fontSize: FontSize;
}
