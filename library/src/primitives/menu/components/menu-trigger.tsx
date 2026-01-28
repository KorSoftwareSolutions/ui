import type { ViewRef } from "@/types/element.types";
import { measureLayoutPosition } from "@/utils/normalize-layout";
import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { type PressableProps } from "react-native";
import { useMenu } from "../context";

export interface MenuTriggerProps extends PressableProps {
  children: React.ReactElement<PressableProps & React.RefAttributes<ViewRef>>;
}

export interface MenuTriggerRef {
  open: () => void;
  close: () => void;
}

export const MenuTrigger = forwardRef<MenuTriggerRef, MenuTriggerProps>((props, ref) => {
  const menu = useMenu();
  const triggerRef = useRef<ViewRef>(null);

  const onTriggerPress = async () => {
    if (!menu.isOpen) {
      measureLayoutPosition(triggerRef.current, (layout) => {
        menu.setTriggerPosition(layout);
        menu.setIsOpen(true);
      });
    } else {
      menu.setIsOpen(false);
    }
  };

  useImperativeHandle(ref, () => ({
    open: () => {
      triggerRef.current?.measureInWindow((pageX, pageY, width, height) => {
        menu.setTriggerPosition({
          height,
          width,
          pageX,
          pageY,
        });
        menu.setIsOpen(true);
      });
    },
    close: () => menu.setIsOpen(false),
  }));

  return React.cloneElement(props.children, {
    ref: triggerRef,
    onPress: onTriggerPress,
    role: "button",
    accessible: true,
    accessibilityRole: "button",
    accessibilityState: { expanded: menu.isOpen },
    ...props.children.props,
  });
});

MenuTrigger.displayName = "MenuTrigger";
