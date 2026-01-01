import React from "react";
import { Pressable, type StyleProp, StyleSheet, type ViewStyle } from "react-native";
import { useDropdownMenu } from "./context";

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
