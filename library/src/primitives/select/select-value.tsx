import React from "react";
import { StyleProp, Text, TextStyle } from "react-native";
import { useSelect } from "./context";

export interface SelectValueProps {
  style?: StyleProp<TextStyle>;

  render?: (props: SelectValueProps) => React.ReactElement;
}

export function SelectValue(props: SelectValueProps) {
  const select = useSelect();

  const selectedOption = select.options.find((option) => option.value === select.value);

  const Component = props.render ?? Text;
  return <Component style={props.style}>{selectedOption?.label ?? select.placeholder}</Component>;
}
