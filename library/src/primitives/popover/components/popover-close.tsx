import React from "react";
import { type PressableProps } from "react-native";
import { usePopover } from "../context";

export interface PopoverCloseProps {
  children: React.ReactElement<PressableProps>;
}

export function PopoverClose(props: PopoverCloseProps): React.ReactElement {
  const popover = usePopover();
  return React.cloneElement(props.children, {
    ...props.children.props,
    onPress: (e) => {
      popover.setIsOpen(false);
      props.children.props.onPress?.(e);
    },
  });
}
