import React from "react";
import { useSelect } from "./context";
import { Pressable, StyleProp, StyleSheet, ViewStyle } from "react-native";
import { calculateComposedStyles } from "../../utils/calculate-styles";

export interface SelectOverlayProps {
  children?: React.ReactNode;

  onPress?: () => void;

  style?: StyleProp<ViewStyle>;

  render?: (props: SelectOverlayProps) => React.ReactElement;
}

export function SelectOverlay(props: SelectOverlayProps) {
  const select = useSelect();

  const composedStyles = calculateComposedStyles(select.styles, select.state, "overlay", props.style);

  const Component = props.render ?? Pressable;
  return (
    <Component
      onPress={() => {
        select.setIsOpen(false);
      }}
      style={[StyleSheet.absoluteFill, composedStyles]}
    >
      {props.children}
    </Component>
  );
}
