import type { ViewStyle } from "react-native";

export type PressableState = "default" | "pressed" | "hovered" | "disabled";

export type PressableStyles = Partial<Record<PressableState, ViewStyle>>;
