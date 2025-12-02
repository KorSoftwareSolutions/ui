import { ButtonRoot } from "./button-root";
import { ButtonLabel } from "./button-label";
import { ButtonSpinner } from "./button-spinner";

export const ButtonPrimitive = {
  Root: ButtonRoot,
  Label: ButtonLabel,
  Spinner: ButtonSpinner,
};

export type { ButtonPrimitiveRootProps } from "./button-root";
export type { ButtonPrimitiveLabelProps } from "./button-label";
export * from "./types";
