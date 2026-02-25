import React from "react";
import { View, type StyleProp, type ViewProps, type ViewStyle } from "react-native";
import { useRadioGroupContext } from "../context";
import { useRadioGroupItemContext } from "./radio-group-item";

export interface RadioGroupContentProps extends ViewProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export function RadioGroupContent(props: RadioGroupContentProps) {
  const { children, style, ...viewProps } = props;
  const { styles } = useRadioGroupContext();
  const { state } = useRadioGroupItemContext();

  const composedStyle = [styles?.content?.default, styles?.content?.[state], style];

  return (
    <View {...viewProps} style={composedStyle}>
      {children}
    </View>
  );
}
