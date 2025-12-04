import { ToastComponent } from "./toast";
import { ToastAPI } from "./toast-manager";

export const Toast = Object.assign(ToastComponent, {
  show: ToastAPI.show,
  dismiss: ToastAPI.dismiss,
});
