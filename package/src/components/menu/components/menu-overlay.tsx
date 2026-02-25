import React from "react";
import {
  Pressable,
  type StyleProp,
  StyleSheet,
  type ViewStyle,
} from "react-native";
import { useMenu } from "../context";

export interface MenuOverlayProps {
  children?: React.ReactNode;

  render?: (props: MenuOverlayProps) => React.ReactElement;

  style?: StyleProp<ViewStyle>;
}

export function MenuOverlay(props: MenuOverlayProps) {
  const menu = useMenu();

  const composedStyle = StyleSheet.flatten([
    StyleSheet.absoluteFill,
    menu.styles?.overlay,
    props.style,
  ]);

  const Component = props.render ?? Pressable;
  return (
    <Component
      onPress={() => {
        requestAnimationFrame(() => {
          menu.setIsOpen(false);
        });
      }}
      style={composedStyle}
    >
      {props.children}
    </Component>
  );
}
