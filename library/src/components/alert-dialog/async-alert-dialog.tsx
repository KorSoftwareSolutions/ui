import React, { useEffect, useState } from "react";
import { useAlertDialog } from "./context";
import { AlertDialog } from "./index";
import { AlertDialogVariants } from "./variants";

interface AsyncAlertDialogProps {
  title: string;
  description: string;
  actionLabel?: string;
  cancelLabel?: string;
  variant?: keyof typeof AlertDialogVariants;
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
    <AlertDialog.Portal>
      <AlertDialog.Overlay onPress={handleCancel} />
      <AlertDialog.Content>
        <AlertDialog.Title>{title}</AlertDialog.Title>
        <AlertDialog.Description>{description}</AlertDialog.Description>
        <AlertDialog.Footer>
          <AlertDialog.Cancel onPress={handleCancel}>{cancelLabel}</AlertDialog.Cancel>
          <AlertDialog.Action onPress={handleAction}>{actionLabel}</AlertDialog.Action>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog.Portal>
  );
}

// Component that renders a single dialog instance
function AsyncAlertDialogInstance({ instance }: { instance: AsyncAlertDialogInstance }) {
  return (
    <AlertDialog.Root {...instance.props}>
      <AsyncAlertDialogContent instance={instance} />
    </AlertDialog.Root>
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
