import React, { useState } from "react";
import { Pressable, StyleSheet, Text, type StyleProp, type ViewStyle } from "react-native";
import { useCombobox } from "../context";
import type { ComboboxOptionState, ComboboxState } from "../types";

export type ComboboxOptionProps<T> = {
  item: T;
  children?: React.ReactNode;
};

const calculateState = (
  comboboxState: ComboboxState,
  hovered: boolean,
  selected: boolean,
): ComboboxOptionState => {
  if (comboboxState === "disabled") return "disabled";
  if (selected) return "selected";
  if (hovered) return "hovered";
  return "default";
};

export function ComboboxOption<T>(props: ComboboxOptionProps<T>) {
  const [isHovered, setIsHovered] = useState(false);
  const combobox = useCombobox();

  const itemValue = combobox.getItemValue(props.item);
  const selectedValue = combobox.value != null ? combobox.getItemValue(combobox.value) : undefined;
  const isSelected = itemValue === selectedValue;

  const optionState = calculateState(combobox.state, isHovered, isSelected);
  const optionStyles = combobox.styles?.option;
  const composedStyles = StyleSheet.flatten([optionStyles?.default, optionStyles?.[optionState]]);

  const handlePress = () => {
    combobox.onChange?.(props.item);
    combobox.setIsOpen(false);
  };
  const handlePointerEnter = () => setIsHovered(true);
  const handlePointerLeave = () => setIsHovered(false);

  const displayContent = props.children ?? combobox.getItemLabel(props.item);

  const Component = typeof props.children === "string" ? Text : Pressable;

  return (
    <Component
      onPress={handlePress}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      style={composedStyles as StyleProp<ViewStyle>}
    >
      {displayContent}
    </Component>
  );
}
