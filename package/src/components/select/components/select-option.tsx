import { calculateComposedStyles } from "../../../utils/calculate-styles";
import React, { useEffect, useState } from "react";
import { Pressable, Text } from "react-native";
import { useSelect } from "../context";
import type { SelectOptionState, SelectState } from "../types";

export type SelectOptionProps = {
  value: string;
  children?: React.ReactNode;
};

const calculateState = (selectState: SelectState, hovered: boolean, selected: boolean): SelectOptionState => {
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
  const composedStyles = calculateComposedStyles(select.styles, optionState, "option");

  useEffect(() => {
    select.setOptions((prev) => {
      if (prev.find((option) => option.value === props.value)) {
        return prev;
      }
      return [...prev, { value: props.value, label: props.children }];
    });
  }, [props.value, props.children]);

  const Component = typeof props.children === "string" ? Text : Pressable;

  return (
    <Component
      onPress={() => {
        select.onChange?.(props.value);
        select.setIsOpen(false);
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
