import { calculateComposedStyles } from "../../../utils/calculate-styles";
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
