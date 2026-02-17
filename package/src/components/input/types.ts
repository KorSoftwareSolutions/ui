import { type InputProps } from "./input";

export type InputState = "default" | "focused" | "disabled";

export type InputStyles = Partial<Record<InputState, InputProps>>;
