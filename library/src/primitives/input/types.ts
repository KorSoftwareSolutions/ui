import { InputProps } from "./input";

export type InputState = "default" | "focused" | "disabled";

export interface InputStyles {
  root: Partial<Record<InputState, InputProps["style"]>>;
}
