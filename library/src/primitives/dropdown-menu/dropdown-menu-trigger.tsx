import React, { forwardRef, RefAttributes, useImperativeHandle, useRef } from "react";
import { PressableProps, View } from "react-native";
import { useDropdownMenu } from "./context";

export interface DropdownMenuTriggerProps extends PressableProps {
  children: React.ReactElement<RefAttributes<View> & PressableProps>;
}

export interface DropdownMenuTriggerRef {
  open: () => void;
  close: () => void;
}

export const DropdownMenuTrigger = forwardRef<DropdownMenuTriggerRef, DropdownMenuTriggerProps>((props, ref) => {
  const dropdownMenu = useDropdownMenu();
  const triggerRef = useRef<View>(null);

  const onTriggerPress = async () => {
    triggerRef.current?.measure((_x, _y, width, height, pageX, pageY) => {
      dropdownMenu.setTriggerPosition({
        height,
        width,
        pageX,
        pageY,
      });
    });

    dropdownMenu.setIsOpen((prev) => !prev);
  };

  useImperativeHandle(ref, () => ({
    open: () => dropdownMenu.setIsOpen(true),
    close: () => dropdownMenu.setIsOpen(false),
  }));

  return React.cloneElement(props.children, {
    ref: triggerRef,
    onPress: onTriggerPress,
    role: "button",
    accessible: true,
    accessibilityRole: "button",
    accessibilityState: { expanded: dropdownMenu.isOpen },
    ...props.children.props,
  });
});

DropdownMenuTrigger.displayName = "DropdownMenuTrigger";
