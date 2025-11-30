import React from "react";
import { Pressable, StyleProp, ViewStyle } from "react-native";
import { useSelect } from "./context";
import { calculateComposedStyles } from "../../utils/calculate-styles";

interface SelectTriggerInjectionProps {
  onPress?: () => void;
}

export interface SelectTriggerProps {
  style?: StyleProp<ViewStyle>;

  render?: (props: SelectTriggerInjectionProps) => React.ReactElement;
}

export function SelectTrigger(props: SelectTriggerProps) {
  const select = useSelect();
  const composedStyles = select.styles ? calculateComposedStyles(select.styles, select.state, "trigger", props.style) : props.style;

  const Component = props.render ?? Pressable;
  return (
    <Component
      onPress={() => {
        console.log("Trigger pressed");
        select.setIsOpen((prev) => !prev);
      }}
      style={composedStyles}
    />
  );
}
