import { AlertDialogAction } from "./alert-dialog-action";
import { AlertDialogCancel } from "./alert-dialog-cancel";
import { AlertDialogContent } from "./alert-dialog-content";
import { AlertDialogDescription } from "./alert-dialog-description";
import { AlertDialogFooter } from "./alert-dialog-footer";
import { AlertDialogOverlay } from "./alert-dialog-overlay";
import { AlertDialogPortal } from "./alert-dialog-portal";
import { AlertDialogRoot } from "./alert-dialog-root";
import { AlertDialogTitle } from "./alert-dialog-title";
import { AlertDialogTrigger } from "./alert-dialog-trigger";

export const AlertDialogPrimitive = {
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

export type { AlertDialogPrimitiveActionProps } from "./alert-dialog-action";
export type { AlertDialogPrimitiveCancelProps } from "./alert-dialog-cancel";
export type { AlertDialogPrimitiveContentProps } from "./alert-dialog-content";
export type { AlertDialogPrimitiveDescriptionProps } from "./alert-dialog-description";
export type { AlertDialogPrimitiveFooterProps } from "./alert-dialog-footer";
export type { AlertDialogPrimitiveOverlayProps } from "./alert-dialog-overlay";
export type { AlertDialogPrimitiveRootProps } from "./alert-dialog-root";
export type { AlertDialogPrimitiveTitleProps } from "./alert-dialog-title";
export type { AlertDialogPrimitiveTriggerProps } from "./alert-dialog-trigger";
export * from "./types";
