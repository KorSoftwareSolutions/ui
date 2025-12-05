import { BadgeRootProps } from "./badge-root";
import { BadgeLabelProps } from "./badge-label";

export type BadgeState = "default";

export interface BadgeStyles {
  root?: Partial<Record<BadgeState, BadgeRootProps["style"]>>;
  label?: Partial<Record<BadgeState, BadgeLabelProps["style"]>>;
}
