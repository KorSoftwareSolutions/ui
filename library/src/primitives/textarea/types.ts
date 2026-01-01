import { type TextareaPrimitiveBaseProps } from "./textarea";

export type TextareaState = "default" | "focused" | "disabled";

export type TextareaStyles = Partial<Record<TextareaState, TextareaPrimitiveBaseProps>>;
