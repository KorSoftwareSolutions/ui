import React, { useState } from "react";
import { LayoutRectangle } from "react-native";
import { DropdownMenuStyles } from "./types";
import { DropdownMenuContext } from "./context";
import { DEFAULT_LAYOUT, DEFAULT_POSITION, LayoutPosition } from "@/hooks/use-relative-position";

export interface DropdownMenuRootProps {
  children?: React.ReactNode;

  render?: (props: DropdownMenuRootProps) => React.ReactNode;

  styles?: DropdownMenuStyles;
}

export function DropdownMenuRoot(props: DropdownMenuRootProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [triggerPosition, setTriggerPosition] = useState<LayoutPosition>(DEFAULT_POSITION);
  const [contentLayout, setContentLayout] = useState<LayoutRectangle>(DEFAULT_LAYOUT);

  return (
    <DropdownMenuContext.Provider
      value={{
        isOpen,
        setIsOpen,
        triggerPosition,
        setTriggerPosition,
        contentLayout,
        setContentLayout,
        styles: props.styles,
      }}
    >
      {props.children}
    </DropdownMenuContext.Provider>
  );
}
