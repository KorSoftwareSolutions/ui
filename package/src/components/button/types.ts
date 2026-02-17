import type { ButtonLabelProps } from "./components/button-label";
import type { ButtonRootProps } from "./components/button-root";
import type { ButtonSpinnerProps } from "./components/button-spinner";

export type ButtonState = "default" | "disabled" | "loading" | "hovered";

export interface ButtonStyles {
  root?: Partial<Record<ButtonState, ButtonRootProps["style"]>>;
  label?: Partial<Record<ButtonState, ButtonLabelProps["style"]>>;
  spinner?: Partial<Record<ButtonState, ButtonSpinnerProps>>;
}
