import React, { useEffect, useState } from "react";
import { AlertDialogAction } from "./components/alert-dialog-action";
import { AlertDialogCancel } from "./components/alert-dialog-cancel";
import { AlertDialogContent } from "./components/alert-dialog-content";
import { AlertDialogDescription } from "./components/alert-dialog-description";
import { AlertDialogFooter } from "./components/alert-dialog-footer";
import { AlertDialogOverlay } from "./components/alert-dialog-overlay";
import { AlertDialogPortal } from "./components/alert-dialog-portal";
import { AlertDialogRoot } from "./components/alert-dialog-root";
import { AlertDialogTitle } from "./components/alert-dialog-title";
import { useAlertDialog } from "./context";
import { AlertDialogVariants } from "./variants";

interface AsyncAlertDialogProps {
  variant?: keyof typeof AlertDialogVariants;
  title: string;
  description: string;
  actionLabel?: string;
  cancelLabel?: string;
}

interface AsyncAlertDialogResult {
  confirmed: boolean;
}

interface AsyncAlertDialogInstance {
  id: string;
  resolve: (result: AsyncAlertDialogResult) => void;
  props: AsyncAlertDialogProps;
}

// Global state
const dialogQueue: AsyncAlertDialogInstance[] = [];
let currentDialog: AsyncAlertDialogInstance | null = null;
let setCurrentDialogFn: ((dialog: AsyncAlertDialogInstance | null) => void) | null = null;

// Process next dialog in queue
function processQueue() {
  if (currentDialog || dialogQueue.length === 0) return;

  currentDialog = dialogQueue.shift()!;
  setCurrentDialogFn?.(currentDialog);
}

// Close current dialog
function closeDialog(confirmed: boolean) {
  if (!currentDialog) return;

  currentDialog.resolve({ confirmed });
  currentDialog = null;
  setCurrentDialogFn?.(null);

  // Process next in queue after a small delay
  setTimeout(processQueue, 100);
}

// Inner component that has access to the dialog context
function AsyncAlertDialogContent({ instance }: { instance: AsyncAlertDialogInstance }) {
  const { title, description, actionLabel = "Continue", cancelLabel = "Cancel" } = instance.props;
  const { setIsOpen } = useAlertDialog();

  const handleAction = () => closeDialog(true);
  const handleCancel = () => closeDialog(false);

  // Automatically open the dialog when mounted
  useEffect(() => {
    setIsOpen(true);
  }, [setIsOpen]);

  return (
    <AlertDialogPortal>
      <AlertDialogOverlay onPress={handleCancel} />
      <AlertDialogContent>
        <AlertDialogTitle>{title}</AlertDialogTitle>
        <AlertDialogDescription>{description}</AlertDialogDescription>
        <AlertDialogFooter>
          <AlertDialogCancel onPress={handleCancel}>{cancelLabel}</AlertDialogCancel>
          <AlertDialogAction onPress={handleAction}>{actionLabel}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialogPortal>
  );
}

// Component that renders a single dialog instance
function AsyncAlertDialogInstance({ instance }: { instance: AsyncAlertDialogInstance }) {
  return (
    <AlertDialogRoot {...instance.props}>
      <AsyncAlertDialogContent instance={instance} />
    </AlertDialogRoot>
  );
}

export function AsyncAlertDialogManager() {
  const [dialog, setDialog] = useState<AsyncAlertDialogInstance | null>(null);

  useEffect(() => {
    setCurrentDialogFn = setDialog;
    return () => {
      setCurrentDialogFn = null;
    };
  }, []);

  if (!dialog) return null;

  return <AsyncAlertDialogInstance instance={dialog} />;
}

function show(props: AsyncAlertDialogProps): Promise<AsyncAlertDialogResult> {
  return new Promise((resolve) => {
    const instance: AsyncAlertDialogInstance = {
      id: Date.now().toString(),
      props,
      resolve,
    };

    dialogQueue.push(instance);
    processQueue();
  });
}

export const AsyncAlertDialog = {
  show,
};
