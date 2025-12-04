import { ToastRootProps } from "./toast-root";
import { ToastTitleProps } from "./toast-title";
import { ToastDescriptionProps } from "./toast-description";

export interface ToastStyles {
  root?: ToastRootProps["style"];
  title?: ToastTitleProps["style"];
  description?: ToastDescriptionProps["style"];
}
