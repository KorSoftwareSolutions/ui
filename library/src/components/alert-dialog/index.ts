import { AlertDialogAction } from "./components/alert-dialog-action";
import { AlertDialogCancel } from "./components/alert-dialog-cancel";
import { AlertDialogContent } from "./components/alert-dialog-content";
import { AlertDialogDescription } from "./components/alert-dialog-description";
import { AlertDialogFooter } from "./components/alert-dialog-footer";
import { AlertDialogOverlay } from "./components/alert-dialog-overlay";
import { AlertDialogPortal } from "./components/alert-dialog-portal";
import { AlertDialogRoot } from "./components/alert-dialog-root";
import { AlertDialogTitle } from "./components/alert-dialog-title";
import { AlertDialogTrigger } from "./components/alert-dialog-trigger";

export const AlertDialog = {
  Root: AlertDialogRoot,
  Trigger: AlertDialogTrigger,
  Portal: AlertDialogPortal,
  Overlay: AlertDialogOverlay,
  Content: AlertDialogContent,
  Title: AlertDialogTitle,
  Description: AlertDialogDescription,
  Footer: AlertDialogFooter,
  Action: AlertDialogAction,
  Cancel: AlertDialogCancel,
};

export type { AlertDialogActionProps } from "./components/alert-dialog-action";
export type { AlertDialogCancelProps } from "./components/alert-dialog-cancel";
export type { AlertDialogContentProps } from "./components/alert-dialog-content";
export type { AlertDialogDescriptionProps } from "./components/alert-dialog-description";
export type { AlertDialogFooterProps } from "./components/alert-dialog-footer";
export type { AlertDialogOverlayProps } from "./components/alert-dialog-overlay";
export type { AlertDialogRootProps } from "./components/alert-dialog-root";
export type { AlertDialogTitleProps } from "./components/alert-dialog-title";
export type { AlertDialogTriggerProps } from "./components/alert-dialog-trigger";
export * from "./types";
