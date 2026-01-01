import { calculateComposedStyles } from "@/utils/calculate-styles";
import { useEffect, useState } from "react";
import { type StyleProp, Text, type TextStyle } from "react-native";
import { useSelect } from "./context";
import type { SelectOptionState, SelectState } from "./types";

export interface SelectOptionProps {
  children: string;
  value: string;

  onMouseEnter?: () => void;
  onMouseLeave?: () => void;

  render?: (props: SelectOptionProps) => React.ReactElement;

  style?: StyleProp<TextStyle>;
}

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

export function SelectOption(props: SelectOptionProps) {
  const [isHovered, setIsHovered] = useState(false);
  const select = useSelect();
  const isSelected = select.value === props.value;

  const optionState = calculateState(select.state, isHovered, isSelected);
  const composedStyles = calculateComposedStyles(select.styles, optionState, "option", props.style);

  useEffect(() => {
    select.setOptions((prev) => {
      if (prev.find((option) => option.value === props.value)) {
        return prev;
      }
      return [...prev, { value: props.value, label: props.children }];
    });
  }, [props.value, props.children]);

  const Component = props.render ?? Text;
  return (
    <Component
      value={props.value}
      onPress={() => {
        select.onChange?.(props.value);
        select.setIsOpen(false);
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={composedStyles}
    >
      {props.children}
    </Component>
  );
}
