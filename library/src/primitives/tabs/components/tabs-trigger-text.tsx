import React from "react";
import { Text, type StyleProp, type TextProps, type TextStyle } from "react-native";
import { useTabsContext } from "../context";

export interface TabsTriggerTextProps extends TextProps {
  children: React.ReactNode;
  value: string;
  isDisabled?: boolean;
  style?: StyleProp<TextStyle>;
}

export function TabsTriggerText(props: TabsTriggerTextProps) {
  const { children, value: triggerValue, isDisabled, style, ...textProps } = props;
  const { value, styles } = useTabsContext();

  const isActive = value === triggerValue;
  const state = isDisabled ? "disabled" : isActive ? "active" : "default";

  const calculatedStyle = [styles?.triggerText?.default, styles?.triggerText?.[state], style];

  return (
    <Text {...textProps} style={calculatedStyle}>
      {children}
    </Text>
  );
}
