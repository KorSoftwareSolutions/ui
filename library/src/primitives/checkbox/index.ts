import { CheckboxRoot } from "./checkbox-root";
import { CheckboxIndicator } from "./checkbox-indicator";
import { CheckboxTitle } from "./checkbox-title";
import { CheckboxDescription } from "./checkbox-description";

export const CheckboxPrimitive = {
  Root: CheckboxRoot,
  Indicator: CheckboxIndicator,
  Title: CheckboxTitle,
  Description: CheckboxDescription,
};

export type { CheckboxPrimitiveRootProps } from "./checkbox-root";
export type { CheckboxPrimitiveIndicatorProps } from "./checkbox-indicator";
export type { CheckboxPrimitiveTitleProps } from "./checkbox-title";
export type { CheckboxPrimitiveDescriptionProps } from "./checkbox-description";
export * from "./types";
