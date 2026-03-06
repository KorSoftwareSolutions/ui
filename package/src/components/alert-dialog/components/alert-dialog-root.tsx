import React, { useMemo, useState } from "react";
import { useComponentConfig } from "../../../themes/provider";
import { mergeStyles } from "../../../utils/calculate-styles";
import { AlertDialogContext, type AlertDialogContextValue } from "../context";
import { AlertDialogVariants } from "../variants";

export interface AlertDialogRootProps {
  variant?: keyof typeof AlertDialogVariants;
  children: React.ReactNode;
}

export function AlertDialogRoot(props: AlertDialogRootProps) {
  const { children } = props;
  const variantStyles = AlertDialogVariants[props.variant || "default"]();
  const componentConfig = useComponentConfig("alertDialog");
  const [isOpen, setIsOpen] = useState(false);

  const mergedStyles = mergeStyles(variantStyles, componentConfig?.styles);

  const contextValue: AlertDialogContextValue = useMemo(
    () => ({
      isOpen,
      setIsOpen,
      styles: mergedStyles,
    }),
    [isOpen, mergedStyles],
  );

  return <AlertDialogContext.Provider value={contextValue}>{children}</AlertDialogContext.Provider>;
}
