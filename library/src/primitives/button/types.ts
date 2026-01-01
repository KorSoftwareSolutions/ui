import type { ButtonPrimitiveLabelProps } from "./button-label";
import type { ButtonPrimitiveRootProps } from "./button-root";

export type ButtonState = "default" | "disabled" | "loading" | "hovered";

export interface ButtonStyles {
  root?: Partial<Record<ButtonState, ButtonPrimitiveRootProps["style"]>>;
  label?: Partial<Record<ButtonState, ButtonPrimitiveLabelProps["style"]>>;
  spinner?: Partial<Record<ButtonState, ButtonPrimitiveLabelProps["style"]>>;
}
