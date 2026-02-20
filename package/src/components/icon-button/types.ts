import type { StyleProp, ViewStyle } from "react-native";
import type { SvgProps } from "../../types/props.types";

export type IconButtonState = "default" | "disabled" | "hovered";

export interface IconButtonStyles {
  root?: Partial<Record<IconButtonState, StyleProp<ViewStyle>>>;
  icon?: Partial<Record<IconButtonState, SvgProps>>;
}
