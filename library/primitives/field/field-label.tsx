import React from "react";
import { useField } from "./context";
import Animated from "react-native-reanimated";

export interface FieldLabelProps {
  children: string;
  style?: React.ComponentProps<typeof Animated.Text>["style"];
  render?: (props: FieldLabelProps) => React.ReactNode;
}

export function FieldLabel(props: FieldLabelProps) {
  const field = useField();
  const calculatedStyle = [field.styles?.label?.default, field.styles?.label?.[field.state], props.style];

  return props.render ? props.render(props) : <Animated.Text style={calculatedStyle}>{props.children}</Animated.Text>;
}
