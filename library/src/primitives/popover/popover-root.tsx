import React, { useState } from "react";
import { PopoverContext } from "./context";
import { PopoverStyles } from "./types";
import { LayoutRectangle } from "react-native";
import { DEFAULT_LAYOUT, DEFAULT_POSITION, LayoutPosition } from "@/hooks/useRelativePosition";

export interface PopoverRootProps {
  children?: React.ReactNode;

  render?: (props: PopoverRootProps) => React.ReactNode;

  styles?: PopoverStyles;
}

export function PopoverRoot(props: PopoverRootProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [contentLayout, setContentLayout] = useState<LayoutRectangle>(DEFAULT_LAYOUT);
  const [triggerPosition, setTriggerPosition] = useState<LayoutPosition>(DEFAULT_POSITION);

  return (
    <PopoverContext.Provider
      value={{
        isOpen,
        setIsOpen,
        contentLayout,
        setContentLayout,
        triggerPosition,
        setTriggerPosition,
        styles: props.styles,
      }}
    >
      {props.children}
    </PopoverContext.Provider>
  );
}
