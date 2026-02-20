import type { TextStyle } from "react-native";
import type { IconProps } from "../icon";
import type { BadgeProps } from "./badge";

export interface BadgeStyles {
  root?: BadgeProps["style"];
  text?: TextStyle;
  icon?: IconProps;
}
