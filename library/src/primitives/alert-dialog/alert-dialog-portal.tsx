import React from "react";
import { Portal } from "../portal";
import { AlertDialogPrimitiveContext, useAlertDialog } from "./context";

interface AlertDialogPortalProps {
  children: React.ReactNode;
}

export function AlertDialogPortal(props: AlertDialogPortalProps) {
  const alertDialog = useAlertDialog();

  if (!alertDialog.isOpen) {
    return null;
  }
  return (
    <Portal name="alert-dialog-content">
      <AlertDialogPrimitiveContext.Provider value={alertDialog}>{props.children}</AlertDialogPrimitiveContext.Provider>
    </Portal>
  );
}
