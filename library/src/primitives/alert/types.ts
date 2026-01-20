import type { AlertBodyProps } from "./alert-body";
import type { AlertDescriptionProps } from "./alert-description";
import type { AlertIconProps } from "./alert-icon";
import type { AlertRootProps } from "./alert-root";
import type { AlertTitleProps } from "./alert-title";

export interface AlertStyles {
  root?: AlertRootProps["style"];
  icon?: AlertIconProps;
  body?: AlertBodyProps["style"];
  title?: AlertTitleProps["style"];
  description?: AlertDescriptionProps["style"];
}
