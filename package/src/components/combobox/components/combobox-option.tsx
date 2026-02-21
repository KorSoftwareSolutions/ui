import React, { useEffect, useState } from "react";
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

export function ComboboxOption(
  props: ComboboxOptionProps,
): React.ReactElement | null {
  const [isHovered, setIsHovered] = useState(false);
  const combobox = useCombobox();
  const isSelected = combobox.value === props.value;

  const optionState = calculateState(combobox.state, isHovered, isSelected);
  const composedStyles = StyleSheet.flatten([
    combobox.styles?.option?.default,
    combobox.styles?.option?.[optionState],
  ]);

  useEffect(() => {
    combobox.setOptions((prev) => {
      if (prev.find((option) => option.value === props.value)) {
        return prev;
      }
      return [
        ...prev,
        {
          value: props.value,
          label: props.label ?? props.children,
        },
      ];
    });
  }, [props.value, props.label, props.children]);

  if (!combobox.filter(props.value, combobox.searchQuery)) {
    return null;
  }

  const Component = typeof props.children === "string" ? Text : Pressable;

  return (
    <Component
      onPress={() => {
        combobox.onChange?.(props.value);
        combobox.setIsOpen(false);
        combobox.setSearchQuery("");
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
