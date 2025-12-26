import React, { forwardRef, RefAttributes, useImperativeHandle, useRef } from "react";
import { PressableProps, View } from "react-native";
import { usePopover } from "./context";

export interface PopoverTriggerProps extends PressableProps {
  children: React.ReactElement<RefAttributes<View> & PressableProps>;
}

export interface PopoverTriggerRef {
  open: () => void;
  close: () => void;
}

export const PopoverTrigger = forwardRef<PopoverTriggerRef, PopoverTriggerProps>((props, ref) => {
  const popover = usePopover();
  const triggerRef = useRef<View>(null);

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
