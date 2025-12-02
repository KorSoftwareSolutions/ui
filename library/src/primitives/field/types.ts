import { FieldPrimitiveRootProps } from "./field-root";
import { FieldLabelProps } from "./field-label";
import { FieldDescriptionProps } from "./field-description";
import { FieldErrorProps } from "./field-error";

export interface FieldStyles {
  root?: FieldPrimitiveRootProps["style"];
  label?: FieldLabelProps["style"];
  description?: FieldDescriptionProps["style"];
  error?: FieldErrorProps["style"];
}
