import React, { useEffect, useState } from "react";
import { Pressable, Text, type StyleProp, type TextStyle, type ViewStyle } from "react-native";
import { useSelect } from "../context";
import type { SelectOptionState, SelectState } from "../types";

export type SelectOptionProps = {
  value: string;
  children?: React.ReactNode;
};

const calculateState = (
  selectState: SelectState,
  hovered: boolean,
  selected: boolean,
): SelectOptionState => {
  if (selectState === "disabled") {
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

export function SelectOption(props: SelectOptionProps): React.ReactElement {
  const [isHovered, setIsHovered] = useState(false);
  const select = useSelect();
  const isSelected = select.value === props.value;

  const optionState = calculateState(select.state, isHovered, isSelected);
  const optionStyles = select.styles?.option;
  const composedStyles: StyleProp<TextStyle> = [optionStyles?.default, optionStyles?.[optionState]];

  useEffect(() => {
    select.setOptions((prev) => {
      if (prev.find((option) => option.value === props.value)) {
        return prev;
      }
      return [...prev, { value: props.value, label: props.children }];
    });
  }, [props.value, props.children]);

  const handlePress = () => {
    select.onChange?.(props.value);
    select.setIsOpen(false);
  };
  const handlePointerEnter = () => setIsHovered(true);
  const handlePointerLeave = () => setIsHovered(false);

  const Component = typeof props.children === "string" ? Text : Pressable;

  return (
    <Component
      onPress={handlePress}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      style={composedStyles as StyleProp<ViewStyle>}
    >
      {props.children}
    </Component>
  );
}
