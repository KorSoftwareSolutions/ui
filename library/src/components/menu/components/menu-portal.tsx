import React from "react";
import { Portal } from "../../portal";
import { MenuContext, useMenu } from "../context";

export interface MenuPortalProps {
  children?: React.ReactNode;
}

export function MenuPortal(props: MenuPortalProps) {
  const menu = useMenu();

  if (!menu.isOpen) {
    return null;
  }

  return (
    <Portal name="menu-portal">
      <MenuContext.Provider value={menu}>{props.children}</MenuContext.Provider>
    </Portal>
  );
}
