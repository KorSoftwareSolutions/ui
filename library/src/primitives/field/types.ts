import { FieldLabelProps } from "./field-label";
import { FieldRootProps } from "./field-root";

export type FieldState = "default" | "disabled" | "error" | "focused" | "hovered";

export interface FieldStyles<TControlStyles = unknown> {
  root?: Partial<Record<FieldState, FieldRootProps["style"]>>;
  label?: Partial<Record<FieldState, FieldLabelProps["style"]>>;
  control?: Partial<Record<FieldState, TControlStyles>>;
}
