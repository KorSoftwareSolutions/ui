import React, { useMemo, useState } from "react";
import { AlertDialogPrimitiveContext } from "./context";
import type { AlertDialogStyles } from "./types";

export interface AlertDialogPrimitiveRootProps {
  children: React.ReactNode;

  styles?: AlertDialogStyles;
}

export function AlertDialogRoot(props: AlertDialogPrimitiveRootProps) {
  const { children, styles } = props;
  const [isOpen, setIsOpen] = useState(false);

  const contextValue = useMemo(
    () => ({
      isOpen,
      setIsOpen,
      styles,
    }),
    [isOpen, styles]
  );

  return <AlertDialogPrimitiveContext.Provider value={contextValue}>{children}</AlertDialogPrimitiveContext.Provider>;
}
