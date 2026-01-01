import type { ViewRef } from "@/types/element.types";
import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { type PressableProps } from "react-native";
import { usePopover } from "./context";

export interface PopoverTriggerProps extends PressableProps {
  children: React.ReactElement<React.RefAttributes<ViewRef> & PressableProps>;
}

export interface PopoverTriggerRef {
  open: () => void;
  close: () => void;
}

export const PopoverTrigger = forwardRef<PopoverTriggerRef, PopoverTriggerProps>((props, ref) => {
  const popover = usePopover();
  const triggerRef = useRef<ViewRef>(null);

  const onTriggerPress = async () => {
    triggerRef.current?.measureInWindow((pageX, pageY, width, height) => {
      popover.setTriggerPosition({
        height,
        width,
        pageX,
        pageY,
      });
    });

    popover.setIsOpen((prev) => !prev);
  };

  useImperativeHandle(ref, () => ({
    open: () => popover.setIsOpen(true),
    close: () => popover.setIsOpen(false),
  }));

  return React.cloneElement(props.children, {
    ref: triggerRef,
    onPress: onTriggerPress,
    role: "button",
    accessible: true,
    accessibilityRole: "button",
    accessibilityState: { expanded: popover.isOpen },
    ...props.children.props,
  });
});

PopoverTrigger.displayName = "PopoverTrigger";
