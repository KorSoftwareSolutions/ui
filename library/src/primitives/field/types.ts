import type { FieldDescriptionProps } from "./components/field-description";
import type { FieldErrorProps } from "./components/field-error";
import type { FieldLabelProps } from "./components/field-label";
import type { FieldPrimitiveRootProps } from "./components/field-root";

export interface FieldStyles {
  root?: FieldPrimitiveRootProps["style"];
  label?: FieldLabelProps["style"];
  description?: FieldDescriptionProps["style"];
  error?: FieldErrorProps["style"];
}
