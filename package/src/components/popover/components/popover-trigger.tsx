import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { type PressableProps } from "react-native";
import type { ViewRef } from "../../../types/element.types";
import { measureLayoutPosition } from "../../../utils/normalize-layout";
import { usePopover } from "../context";

export interface PopoverTriggerProps extends PressableProps {
  children: React.ReactElement<React.RefAttributes<ViewRef> & PressableProps>;
}

export interface PopoverTriggerRef {
  open: () => void;
  close: () => void;
}

export const PopoverTrigger = forwardRef<
  PopoverTriggerRef,
  PopoverTriggerProps
>((props, ref) => {
  const popover = usePopover();
  const triggerRef = useRef<ViewRef>(null);

  const onTriggerPress = async () => {
    if (!popover.isOpen) {
      measureLayoutPosition(triggerRef.current, (layout) => {
        popover.setTriggerPosition(layout);
        popover.setIsOpen(true);
      });
    } else {
      popover.setIsOpen(false);
    }
  };

  useImperativeHandle(ref, () => ({
    open: () => {
      measureLayoutPosition(triggerRef.current, (layout) => {
        popover.setTriggerPosition(layout);
        popover.setIsOpen(true);
      });
    },
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
