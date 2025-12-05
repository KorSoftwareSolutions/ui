import React from "react";
import { Portal } from "../portal";
import { useDropdownMenu, DropdownMenuContext } from "./context";

export interface DropdownMenuPortalProps {
  children?: React.ReactNode;
}

export function DropdownMenuPortal(props: DropdownMenuPortalProps) {
  const menu = useDropdownMenu();

  if (!menu.isOpen) {
    return null;
  }

  return (
    <Portal name="dropdown-menu-portal">
      <DropdownMenuContext.Provider value={menu}>{props.children}</DropdownMenuContext.Provider>
    </Portal>
  );
}
