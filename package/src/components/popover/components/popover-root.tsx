import React, { useState } from "react";
import { type LayoutRectangle } from "react-native";
import {
  DEFAULT_LAYOUT,
  DEFAULT_POSITION,
  type LayoutPosition,
} from "../../../hooks/use-relative-position";
import { useComponentConfig } from "../../../themes/provider";
import { mergeStyles } from "../../../utils/calculate-styles";
import { PopoverContext } from "../context";
import { PopoverVariants } from "../variants";

export interface PopoverRootProps {
  variant?: keyof typeof PopoverVariants;
  children?: React.ReactNode;
}

export function PopoverRoot(props: PopoverRootProps) {
  const variantStyles = PopoverVariants[props.variant || "default"]();
  const componentConfig = useComponentConfig("popover");
  const mergedStyles = mergeStyles(variantStyles, componentConfig?.styles);
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
        styles: mergedStyles,
      }}
    >
      {props.children}
    </PopoverContext.Provider>
  );
}
