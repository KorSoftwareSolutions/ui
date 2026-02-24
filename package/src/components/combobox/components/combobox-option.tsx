import React, { useState } from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { useCombobox } from "../context";
import type { ComboboxOptionState, ComboboxState } from "../types";

export type ComboboxOptionProps = {
  value: string;
  label?: string;
  children?: React.ReactNode;
};

const calculateState = (
  comboboxState: ComboboxState,
  hovered: boolean,
  selected: boolean,
): ComboboxOptionState => {
  if (comboboxState === "disabled") {
    return "disabled";
  }
  if (selected) {
    return "selected";
  }
  if (hovered) {
    return "hovered";
  }
  return "default";
};

export function ComboboxOption(props: ComboboxOptionProps) {
  const [isHovered, setIsHovered] = useState(false);
  const combobox = useCombobox();
  const isSelected = combobox.value === props.value;

  const optionState = calculateState(combobox.state, isHovered, isSelected);
  const composedStyles = StyleSheet.flatten([
    combobox.styles?.option?.default,
    combobox.styles?.option?.[optionState],
  ]);

  const Component = typeof props.children === "string" ? Text : Pressable;

  return (
    <Component
      onPress={() => {
        const label =
          props.label ??
          (typeof props.children === "string" ? props.children : props.value);
        combobox.onChange?.(label);
        combobox.setIsOpen(false);
      }}
      onPointerEnter={() => {
        setIsHovered(true);
      }}
      onPointerLeave={() => {
        setIsHovered(false);
      }}
      style={composedStyles}
    >
      {props.children}
    </Component>
  );
}
