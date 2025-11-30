import React, { useEffect } from "react";
import { Portal } from "../portal";
import { useSelect, SelectContext } from "./context";

export interface SelectPortalProps {
  children?: React.ReactNode;
}

export function SelectPortal(props: SelectPortalProps) {
  const select = useSelect();

  useEffect(() => {
    return () => {
      select.setOptions([]);
    };
  }, []);

  if (!select.isOpen) {
    return null;
  }

  return (
    <Portal name="select-portal">
      <SelectContext.Provider value={select}>{props.children}</SelectContext.Provider>
    </Portal>
  );
}
