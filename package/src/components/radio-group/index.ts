import { RadioGroupContent } from "./components/radio-group-content";
import { RadioGroupDescription } from "./components/radio-group-description";
import { RadioGroupIndicator } from "./components/radio-group-indicator";
import { RadioGroupItem } from "./components/radio-group-item";
import { RadioGroupRoot } from "./components/radio-group-root";
import { RadioGroupTitle } from "./components/radio-group-title";

export const RadioGroup = {
  Root: RadioGroupRoot,
  Item: RadioGroupItem,
  Indicator: RadioGroupIndicator,
  Content: RadioGroupContent,
  Title: RadioGroupTitle,
  Description: RadioGroupDescription,
};

export type { RadioGroupContentProps } from "./components/radio-group-content";
export type { RadioGroupDescriptionProps } from "./components/radio-group-description";
export type { RadioGroupIndicatorProps } from "./components/radio-group-indicator";
export type { RadioGroupItemProps } from "./components/radio-group-item";
export type { RadioGroupRootProps } from "./components/radio-group-root";
export type { RadioGroupTitleProps } from "./components/radio-group-title";
export * from "./types";
