import React from "react";
import { View, type StyleProp, type ViewProps, type ViewStyle } from "react-native";
import { useCheckboxContext } from "../context";

export interface CheckboxContentProps extends ViewProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export function CheckboxContent(props: CheckboxContentProps) {
  const { children, style, ...viewProps } = props;
  const { state, styles } = useCheckboxContext();

  const calculatedStyle = [styles?.content?.default, styles?.content?.[state], style];

  return (
    <View {...viewProps} style={calculatedStyle}>
      {children}
    </View>
  );
}
