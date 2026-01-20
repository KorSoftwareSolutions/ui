import type { ProgressIndicatorProps } from "./progress-indicator";
import type { ProgressRootProps } from "./progress-root";

export type ProgressState = "default";

export interface ProgressStyles {
  root?: Partial<Record<ProgressState, ProgressRootProps["style"]>>;
  indicator?: Partial<Record<ProgressState, ProgressIndicatorProps["style"]>>;
}
