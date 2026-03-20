import React from "react";
import { Pressable, type StyleProp, StyleSheet, type ViewStyle } from "react-native";
import { useSelect } from "../context";

export interface SelectOverlayProps {
  children?: React.ReactNode;

  onPress?: () => void;

  style?: StyleProp<ViewStyle>;

  render?: (props: SelectOverlayProps) => React.ReactElement;
}

export function SelectOverlay(props: SelectOverlayProps) {
  const select = useSelect();

  const composedStyles = StyleSheet.flatten([
    select.styles?.overlay?.default,
    select.styles?.overlay?.[select.state],
    props.style,
    StyleSheet.absoluteFill,
  ]);

  const Component = props.render ?? Pressable;
  return (
    <Component
      onPress={() => {
        select.setIsOpen(false);
      }}
      pointerEvents="auto"
      style={composedStyles}
    >
      {props.children}
    </Component>
  );
}
