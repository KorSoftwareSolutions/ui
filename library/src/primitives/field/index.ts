import { FieldDescription } from "./components/field-description";
import { FieldError } from "./components/field-error";
import { FieldLabel } from "./components/field-label";
import { FieldRoot } from "./components/field-root";

export const Field = {
  Root: FieldRoot,
  Label: FieldLabel,
  Description: FieldDescription,
  Error: FieldError,
};

export type { FieldDescriptionProps } from "./components/field-description";
export type { FieldErrorProps } from "./components/field-error";
export type { FieldLabelProps } from "./components/field-label";
export type { FieldPrimitiveRootProps } from "./components/field-root";
export type { FieldStyles } from "./types";
