import React from "react";
import { StyleProp, Text, TextStyle } from "react-native";
import { useSelect } from "./context";
import { calculateComposedStyles } from "@/utils/calculate-styles";

export interface SelectValueProps {
  style?: StyleProp<TextStyle>;

  render?: (props: SelectValueProps) => React.ReactElement;
}

export function SelectValue(props: SelectValueProps) {
  const select = useSelect();

  const selectedOption = select.options.find((option) => option.value === select.value);
  const selectedOptionLabel = selectedOption?.label;

  const composedStyles = calculateComposedStyles(select.styles, select.state, selectedOptionLabel ? "value" : "placeholder", props.style);
  const Component = props.render ?? Text;
  return <Component style={composedStyles}>{selectedOption?.label ?? select.placeholder}</Component>;
}
