import React from "react";
import { Pressable, StyleProp, ViewStyle } from "react-native";
import { useSelect } from "./context";
import { calculateComposedStyles } from "@/utils/calculate-styles";
import { normalizeLayout } from "@/utils/normalize-layout";

interface SelectTriggerInjectionProps {
  onPress?: () => void;
}

export interface SelectTriggerProps {
  children?: React.ReactNode;

  style?: StyleProp<ViewStyle>;

  render?: (props: SelectTriggerInjectionProps) => React.ReactElement;
}

export function SelectTrigger(props: SelectTriggerProps) {
  const select = useSelect();
  const composedStyles = calculateComposedStyles(select.styles, select.state, "trigger", props.style);
  const Component = props.render ?? Pressable;
  return (
    <Component
      onPress={() => {
        select.setIsOpen((prev) => !prev);
      }}
      onLayout={(e) => {
        const layout = normalizeLayout(e.nativeEvent.layout);
        select.setTriggerLayout(layout);
      }}
      disabled={select.isDisabled}
      style={composedStyles}
    >
      {props.children}
    </Component>
  );
}
