import type { ViewRef } from "@/types/element.types";
import { measureLayoutPosition } from "@/utils/normalize-layout";
import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { type PressableProps } from "react-native";
import { useDropdownMenu } from "./context";

export interface DropdownMenuTriggerProps extends PressableProps {
  children: React.ReactElement<PressableProps & React.RefAttributes<ViewRef>>;
}

export interface DropdownMenuTriggerRef {
  open: () => void;
  close: () => void;
}

export const DropdownMenuTrigger = forwardRef<DropdownMenuTriggerRef, DropdownMenuTriggerProps>((props, ref) => {
  const dropdownMenu = useDropdownMenu();
  const triggerRef = useRef<ViewRef>(null);

  const onTriggerPress = async () => {
    if (!dropdownMenu.isOpen) {
      measureLayoutPosition(triggerRef.current, (layout) => {
        dropdownMenu.setTriggerPosition(layout);
        dropdownMenu.setIsOpen(true);
      });
    } else {
      dropdownMenu.setIsOpen(false);
    }
  };

  useImperativeHandle(ref, () => ({
    open: () => {
      triggerRef.current?.measureInWindow((pageX, pageY, width, height) => {
        dropdownMenu.setTriggerPosition({
          height,
          width,
          pageX,
          pageY,
        });
        dropdownMenu.setIsOpen(true);
      });
    },
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
