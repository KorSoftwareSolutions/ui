import { DEFAULT_LAYOUT, DEFAULT_POSITION, type LayoutPosition } from "@/hooks/use-relative-position";
import React, { useState } from "react";
import { type LayoutRectangle } from "react-native";
import { MenuContext } from "../context";
import { MenuVariants } from "../variants";

export interface MenuRootProps {
  variant?: keyof typeof MenuVariants;
  children?: React.ReactNode;

  render?: (props: MenuRootProps) => React.ReactNode;
}

export function MenuRoot(props: MenuRootProps) {
  const variantStyles = MenuVariants[props.variant || "default"]();
  const [isOpen, setIsOpen] = useState(false);
  const [triggerPosition, setTriggerPosition] = useState<LayoutPosition>(DEFAULT_POSITION);
  const [contentLayout, setContentLayout] = useState<LayoutRectangle>(DEFAULT_LAYOUT);

  return (
    <MenuContext.Provider
      value={{
        isOpen,
        setIsOpen,
        triggerPosition,
        setTriggerPosition,
        contentLayout,
        setContentLayout,
        styles: variantStyles,
      }}
    >
      {props.children}
    </MenuContext.Provider>
  );
}
