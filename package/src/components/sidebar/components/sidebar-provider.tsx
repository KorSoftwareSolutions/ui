import React, { useCallback, useMemo, useState } from "react";
import { useComponentConfig } from "../../../themes/provider";
import { mergeStyles } from "../../../utils/calculate-styles";
import { SidebarContext, type SidebarContextValue } from "../context";
import { SidebarVariants } from "../variants";

export interface SidebarProviderProps {
  children?: React.ReactNode;

  /** Variant key for sidebar theming */
  variant?: keyof typeof SidebarVariants;

  /** Width of the sidebar in pixels (default: 256) */
  width?: number;

  /** Default open state (uncontrolled) */
  defaultOpen?: boolean;

  /** Open state (controlled) */
  open?: boolean;

  /** Callback when open state changes (controlled) */
  onOpenChange?: (open: boolean) => void;
}

export function SidebarProvider(props: SidebarProviderProps) {
  const {
    children,
    variant = "default",
    width,
    defaultOpen = true,
    open: controlledOpen,
    onOpenChange,
  } = props;

  const [_open, _setOpen] = useState(defaultOpen);

  const open = controlledOpen ?? _open;
  const setOpen = useCallback(
    (value: boolean) => {
      if (onOpenChange) {
        onOpenChange(value);
      } else {
        _setOpen(value);
      }
    },
    [onOpenChange],
  );

  const toggleSidebar = useCallback(() => {
    setOpen(!open);
  }, [open, setOpen]);

  const variantStyles = SidebarVariants[variant]();
  const componentConfig = useComponentConfig("sidebar");
  const mergedStyles = mergeStyles(variantStyles, componentConfig?.styles);

  const state = open ? "expanded" : "collapsed";

  const contextValue = useMemo<SidebarContextValue>(
    () => ({
      state,
      open,
      setOpen,
      toggleSidebar,
      width,
      styles: mergedStyles,
    }),
    [state, open, setOpen, toggleSidebar, width, mergedStyles],
  );

  return <SidebarContext.Provider value={contextValue}>{children}</SidebarContext.Provider>;
}
