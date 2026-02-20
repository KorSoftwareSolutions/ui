import type {
  ActivityIndicatorProps,
  TextStyle,
  ViewStyle,
} from "react-native";
import type { IconProps } from "../icon";

export type ButtonState = "default" | "disabled" | "loading" | "hovered";

export interface ButtonStyles {
  root?: Partial<Record<ButtonState, ViewStyle>>;
  text?: Partial<Record<ButtonState, TextStyle>>;
  icon?: Partial<Record<ButtonState, IconProps>>;
  spinner?: Partial<Record<ButtonState, ActivityIndicatorProps>>;
}
