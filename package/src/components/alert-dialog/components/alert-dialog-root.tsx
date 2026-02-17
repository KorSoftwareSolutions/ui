import React, { useMemo, useState } from "react";
import { AlertDialogContext, type AlertDialogContextValue } from "../context";
import { AlertDialogVariants } from "../variants";

export interface AlertDialogRootProps {
  variant?: keyof typeof AlertDialogVariants;
  children: React.ReactNode;
}

export function AlertDialogRoot(props: AlertDialogRootProps) {
  const variantStyles = AlertDialogVariants[props.variant || "default"]();
  const { children } = props;
  const [isOpen, setIsOpen] = useState(false);

  const contextValue: AlertDialogContextValue = useMemo(
    () => ({
      isOpen,
      setIsOpen,
      styles: variantStyles,
    }),
    [isOpen, variantStyles],
  );

  return <AlertDialogContext.Provider value={contextValue}>{children}</AlertDialogContext.Provider>;
}
