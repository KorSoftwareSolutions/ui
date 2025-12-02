import { FieldRoot } from "./field-root";
import { FieldLabel } from "./field-label";
import { FieldDescription } from "./field-description";
import { FieldError } from "./field-error";

export const FieldPrimitive = {
  Root: FieldRoot,
  Label: FieldLabel,
  Description: FieldDescription,
  Error: FieldError,
};

export type { FieldPrimitiveRootProps } from "./field-root";
export type { FieldLabelProps } from "./field-label";
export type { FieldDescriptionProps } from "./field-description";
export type { FieldErrorProps } from "./field-error";
export type { FieldStyles } from "./types";
