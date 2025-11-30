import { ButtonRootProps } from "./button-root";
import { ButtonLabelProps } from "./button-label";

export type ButtonState = "default" | "disabled";

export interface ButtonStyles {
  root?: Partial<Record<ButtonState, ButtonRootProps["style"]>>;
  label?: Partial<Record<ButtonState, ButtonLabelProps["style"]>>;
}
