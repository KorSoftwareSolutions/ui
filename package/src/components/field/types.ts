import type { FieldDescriptionProps } from "./components/field-description";
import type { FieldErrorProps } from "./components/field-error";
import type { FieldLabelProps } from "./components/field-label";
import type { FieldRootProps } from "./components/field-root";

export interface FieldStyles {
  root?: FieldRootProps["style"];
  label?: FieldLabelProps["style"];
  description?: FieldDescriptionProps["style"];
  error?: FieldErrorProps["style"];
}
