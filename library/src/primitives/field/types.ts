import type { FieldDescriptionProps } from "./field-description";
import type { FieldErrorProps } from "./field-error";
import type { FieldLabelProps } from "./field-label";
import type { FieldPrimitiveRootProps } from "./field-root";

export interface FieldStyles {
  root?: FieldPrimitiveRootProps["style"];
  label?: FieldLabelProps["style"];
  description?: FieldDescriptionProps["style"];
  error?: FieldErrorProps["style"];
}
