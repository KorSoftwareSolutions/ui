import React from "react";
import { Pressable, StyleProp, ViewStyle } from "react-native";

interface SelectTriggerInjectionProps {
  onPress?: () => void;
}

interface SelectTriggerProps {
  style?: StyleProp<ViewStyle>;

  render?: (props: SelectTriggerInjectionProps) => React.ReactElement;
}

export function SelectTrigger(props: SelectTriggerProps) {
  const Component = props.render ?? Pressable;
  return (
    <Component
      onPress={() => {
        console.log("SelectTrigger pressed");
      }}
      style={props.style}
    />
  );
}
