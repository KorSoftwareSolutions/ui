import React from "react";
import { useField } from "./field-context";
import { StyleProp, TextStyle } from "react-native";

interface FieldControlInjectedProps {
  value?: string;
  onChange?: (value: string) => void;

  onFocus?: () => void;
  onBlur?: () => void;

  style?: StyleProp<TextStyle>;
}

export interface FieldControlProps {
  style?: StyleProp<TextStyle>;
  render: (props: FieldControlInjectedProps) => React.ReactElement;
}

export function FieldControl(props: FieldControlProps) {
  const { value, onChange, setFocused, ...field } = useField();

  const calculatedStyle = [field.styles?.control?.default, field.styles?.control?.[field.state], props.style];

  const Component = props.render;
  return <Component value={value} onChange={onChange} onBlur={() => setFocused(false)} onFocus={() => setFocused(true)} style={calculatedStyle} />;
}
