import React from "react";
import { Pressable, type PressableProps, type StyleProp, StyleSheet, type ViewStyle } from "react-native";
import { usePopover } from "./context";

export interface PopoverOverlayProps extends Omit<PressableProps, "onPress"> {
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
      pointerEvents="auto"
      style={composedStyle}
    />
  );
}
