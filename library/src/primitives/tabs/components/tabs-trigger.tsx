import React from "react";
import { Pressable, type PressableProps, type StyleProp, type ViewStyle } from "react-native";
import { useTabsContext } from "../context";
import type { TabsState } from "../types";

export interface TabsTriggerProps extends PressableProps {
  children: React.ReactNode;
  value: string;
  isDisabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

const calculateState = (isActive: boolean, isDisabled: boolean | undefined): TabsState => {
  if (isDisabled) {
    return "disabled";
  }
  if (isActive) {
    return "active";
  }
  return "default";
};

export function TabsTrigger(props: TabsTriggerProps) {
  const { children, value: triggerValue, isDisabled, style, ...pressableProps } = props;
  const { value, onChange, styles } = useTabsContext();

  const isActive = value === triggerValue;
  const state = calculateState(isActive, isDisabled);

  const handlePress = () => {
    if (!isDisabled) {
      onChange(triggerValue);
    }
  };

  const calculatedStyle = [styles?.trigger?.default, styles?.trigger?.[state], style];

  return (
    <Pressable {...pressableProps} disabled={isDisabled} onPress={handlePress} style={calculatedStyle}>
      {children}
    </Pressable>
  );
}
