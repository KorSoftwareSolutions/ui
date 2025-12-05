import React from "react";
import { usePopover } from "./context";
import { Pressable, PressableProps, StyleProp, StyleSheet, ViewStyle } from "react-native";

export interface PopoverOverlayProps extends Omit<PressableProps, "onPress"> {
  children?: React.ReactNode;

  onPress?: () => void;
  closeOnPress?: boolean;

  render?: (props: PopoverOverlayProps) => React.ReactElement;

  style?: StyleProp<ViewStyle>;
}

export function PopoverOverlay(props: PopoverOverlayProps) {
  const { closeOnPress = true, ...restProps } = props;
  const popover = usePopover();

  const composedStyle = [StyleSheet.absoluteFill, popover.styles?.overlay, props.style];

  const Component = props.render ?? Pressable;
  return (
    <Component
      {...restProps}
      onPress={() => {
        if (closeOnPress) {
          popover.setIsOpen(false);
        }
        props.onPress?.();
      }}
      style={composedStyle}
    >
      {props.children}
    </Component>
  );
}
