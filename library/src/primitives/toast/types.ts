import type { ToastDescriptionProps } from "./components/toast-description";
import type { ToastRootProps } from "./components/toast-root";
import type { ToastTitleProps } from "./components/toast-title";

export interface ToastStyles {
  root?: ToastRootProps["style"];
  title?: ToastTitleProps["style"];
  description?: ToastDescriptionProps["style"];
}
