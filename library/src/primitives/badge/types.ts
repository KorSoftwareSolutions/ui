import type { BadgeLabelProps } from "./components/badge-label";
import type { BadgeRootProps } from "./components/badge-root";

export type BadgeState = "default";

export interface BadgeStyles {
  root?: Partial<Record<BadgeState, BadgeRootProps["style"]>>;
  label?: Partial<Record<BadgeState, BadgeLabelProps["style"]>>;
}
