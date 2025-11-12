import React from "react";
import { useField } from "./field-context";
import { StyleProp, TextStyle } from "react-native";

interface FieldControlInjectedProps {
  value?: string;
  onChange?: (value: string) => void;
  style?: StyleProp<TextStyle>;
}

export interface FieldControlProps {
  style?: StyleProp<TextStyle>;
  render: (props: FieldControlInjectedProps) => React.ReactElement;
}

export function FieldControl(props: FieldControlProps) {
  const { value, onChange, ...field } = useField();
  const Component = props.render;
  const calculatedStyle = field.styles?.control ?? props.style;
  return <Component value={value} onChange={onChange} style={calculatedStyle} />;
}
