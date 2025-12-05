import React from "react";
import { Pressable, PressableProps, StyleProp, ViewStyle } from "react-native";
import { usePopover } from "./context";

export interface PopoverCloseProps extends Omit<PressableProps, "onPress"> {
  children?: React.ReactNode;

  onPress?: () => void;

  render?: (props: PopoverCloseProps) => React.ReactNode;

  style?: StyleProp<ViewStyle>;
}

export function PopoverClose(props: PopoverCloseProps) {
  const popover = usePopover();

  const Component = props.render ?? Pressable;
  return (
    <Component
      {...props}
      onPress={() => {
        popover.setIsOpen(false);
        props.onPress?.();
      }}
      style={props.style}
    />
  );
}
