import React from "react";
import { Portal } from "../../portal";
import { AlertDialogContext, useAlertDialog } from "../context";

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
      <AlertDialogContext.Provider value={alertDialog}>
        {props.children}
      </AlertDialogContext.Provider>
    </Portal>
  );
}
