import React, { useState } from "react";
import { Pressable, StyleSheet, type StyleProp, type ViewStyle } from "react-native";
import type { ElementChildren } from "../../../types/element.types";
import { useCombobox } from "../context";
import type { ComboboxOptionState, ComboboxState } from "../types";

export type ComboboxOptionProps<T> = {
  item: T;
  children?: ElementChildren;
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

  return (
    <Pressable
      onPress={handlePress}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
      style={composedStyles as StyleProp<ViewStyle>}
    >
      {props.children}
    </Pressable>
  );
}
