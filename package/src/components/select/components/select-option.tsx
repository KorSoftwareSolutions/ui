import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, type PressableProps } from "react-native";
import type { ElementChildren } from "../../../types/element.types";
import { useSelect } from "../context";
import type { SelectOptionState, SelectState } from "../types";

export type SelectOptionProps = {
  value: string;
  children?: ElementChildren;
  style?: PressableProps["style"];
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

  return (
    <Pressable
      onPress={handlePress}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      style={(styleProps) =>
        StyleSheet.flatten([
          optionStyles?.default,
          optionStyles?.[optionState],
          typeof props.style === "function" ? props.style(styleProps) : props.style,
        ])
      }
    >
      {props.children}
    </Pressable>
  );
}
