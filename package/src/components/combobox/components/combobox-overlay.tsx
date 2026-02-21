import React from "react";
import {
  Pressable,
  type StyleProp,
  StyleSheet,
  type ViewStyle,
} from "react-native";
import { useCombobox } from "../context";

export interface ComboboxOverlayProps {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export function ComboboxOverlay(props: ComboboxOverlayProps) {
  const combobox = useCombobox();

  const composedStyles = StyleSheet.flatten([
    combobox.styles?.overlay?.default,
    combobox.styles?.overlay?.[combobox.state],
    props.style,
  ]);

  return (
    <Pressable
      onPress={() => {
        combobox.setIsOpen(false);
        combobox.setSearchQuery("");
      }}
      pointerEvents="auto"
      style={[StyleSheet.absoluteFill, composedStyles]}
    >
      {props.children}
    </Pressable>
  );
}
