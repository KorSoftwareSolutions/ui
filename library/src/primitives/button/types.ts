import { ButtonPrimitiveRootProps } from "./button-root";
import { ButtonPrimitiveLabelProps } from "./button-label";

export type ButtonState = "default" | "disabled" | "loading";

export interface ButtonStyles {
  root?: Partial<Record<ButtonState, ButtonPrimitiveRootProps["style"]>>;
  label?: Partial<Record<ButtonState, ButtonPrimitiveLabelProps["style"]>>;
  spinner?: Partial<Record<ButtonState, ButtonPrimitiveLabelProps["style"]>>;
}
