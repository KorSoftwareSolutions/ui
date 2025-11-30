import React from "react";
import { useField } from "./context";
import { StyleProp, TextStyle } from "react-native";
import { calculateComposedStyles } from "../../utils/calculate-styles";

interface FieldControlInjectedProps<Style> {
  value?: string;
  onChange?: (value: string) => void;

  onFocus?: () => void;
  onBlur?: () => void;

  style?: StyleProp<Style>;
}

export interface FieldControlProps<Style = TextStyle> {
  style?: StyleProp<Style>;
  render: (props: FieldControlInjectedProps<Style>) => React.ReactElement;
}

export function FieldControl<Style = TextStyle>(props: FieldControlProps<Style>) {
  const { value, onChange, setFocused, ...field } = useField();

  const calculatedStyle = calculateComposedStyles(field.styles, field.state, "control", props.style) as StyleProp<Style>;

  const Component = props.render;
  return <Component value={value} onChange={onChange} onBlur={() => setFocused(false)} onFocus={() => setFocused(true)} style={calculatedStyle} />;
}
