import type { ToastDescriptionProps } from "./toast-description";
import type { ToastRootProps } from "./toast-root";
import type { ToastTitleProps } from "./toast-title";

export interface ToastStyles {
  root?: ToastRootProps["style"];
  title?: ToastTitleProps["style"];
  description?: ToastDescriptionProps["style"];
}
