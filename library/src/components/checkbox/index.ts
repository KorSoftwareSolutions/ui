import { CheckboxDescription } from "./components/checkbox-description";
import { CheckboxIndicator } from "./components/checkbox-indicator";
import { CheckboxRoot } from "./components/checkbox-root";
import { CheckboxTitle } from "./components/checkbox-title";

export const Checkbox = {
  Root: CheckboxRoot,
  Indicator: CheckboxIndicator,
  Title: CheckboxTitle,
  Description: CheckboxDescription,
};

export type { CheckboxDescriptionProps } from "./components/checkbox-description";
export type { CheckboxIndicatorProps } from "./components/checkbox-indicator";
export type { CheckboxRootProps } from "./components/checkbox-root";
export type { CheckboxTitleProps } from "./components/checkbox-title";
export * from "./types";
