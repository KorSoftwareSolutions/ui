import React from "react";
import { useDropdownMenu } from "./context";
import { Pressable, StyleProp, StyleSheet, ViewStyle } from "react-native";

export interface DropdownMenuOverlayProps {
  children?: React.ReactNode;

  render?: (props: DropdownMenuOverlayProps) => React.ReactElement;

  style?: StyleProp<ViewStyle>;
}

export function DropdownMenuOverlay(props: DropdownMenuOverlayProps) {
  const menu = useDropdownMenu();

  const composedStyle = [StyleSheet.absoluteFill, menu.styles?.overlay, props.style];

  const Component = props.render ?? Pressable;
  return (
    <Component
      onPress={() => {
        menu.setIsOpen(false);
      }}
      style={composedStyle}
    >
      {props.children}
    </Component>
  );
}
