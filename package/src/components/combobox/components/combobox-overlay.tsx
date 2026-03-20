import React from "react";
import { Pressable, type StyleProp, StyleSheet, type ViewStyle } from "react-native";
import { focusPreventProps } from "../../focus/focus-prevent";
import { useCombobox } from "../context";

export interface ComboboxOverlayProps {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export function ComboboxOverlay(props: ComboboxOverlayProps) {
  const combobox = useCombobox();

  const onPress = () => {
    combobox.inputRef.current?.blur();
    requestAnimationFrame(() => {
      combobox.setIsOpen(false);
    });
  };

  const composedStyles = StyleSheet.flatten([
    combobox.styles?.overlay?.default,
    combobox.styles?.overlay?.[combobox.state],
    props.style,
  ]);

  return (
    <Pressable
      onPress={onPress}
      pointerEvents="auto"
      style={[StyleSheet.absoluteFill, composedStyles]}
      {...focusPreventProps}
    >
      {props.children}
    </Pressable>
  );
}
