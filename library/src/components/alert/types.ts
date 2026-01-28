import type { AlertBodyProps } from "./components/alert-body";
import type { AlertDescriptionProps } from "./components/alert-description";
import type { AlertIconProps } from "./components/alert-icon";
import type { AlertRootProps } from "./components/alert-root";
import type { AlertTitleProps } from "./components/alert-title";

export interface AlertStyles {
  root?: AlertRootProps["style"];
  icon?: AlertIconProps;
  body?: AlertBodyProps["style"];
  title?: AlertTitleProps["style"];
  description?: AlertDescriptionProps["style"];
}
