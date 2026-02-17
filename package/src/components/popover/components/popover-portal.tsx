import React from "react";
import { Portal } from "../../portal";
import { PopoverContext, usePopover } from "../context";

export interface PopoverPortalProps {
  children?: React.ReactNode;
}

export function PopoverPortal(props: PopoverPortalProps) {
  const popover = usePopover();

  if (!popover.isOpen) {
    return null;
  }

  return (
    <Portal name="popover-portal">
      <PopoverContext.Provider value={popover}>{props.children}</PopoverContext.Provider>
    </Portal>
  );
}
