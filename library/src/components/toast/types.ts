import type { ToastDescriptionProps } from "./components/toast-description";
import type { ToastIconProps } from "./components/toast-icon";
import type { ToastRootProps } from "./components/toast-root";
import type { ToastTitleProps } from "./components/toast-title";

export interface ToastStyles {
  root?: ToastRootProps["style"];
  icon?: ToastIconProps;
  title?: ToastTitleProps["style"];
  description?: ToastDescriptionProps["style"];
}
