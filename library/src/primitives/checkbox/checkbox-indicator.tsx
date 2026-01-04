import React from "react";
import { Text, View, type StyleProp, type ViewProps, type ViewStyle } from "react-native";
import { useCheckboxContext } from "./checkbox-context";
import type { CheckboxState } from "./types";

export interface CheckboxPrimitiveIndicatorProps extends ViewProps {
  style?: StyleProp<ViewStyle>;
}

const calculateState = (rootState: CheckboxState, checked: boolean): CheckboxState => {
  if (rootState === "disabled") {
    return "disabled";
  }
  if (checked) {
    return "checked";
  }
  return rootState;
};

export function CheckboxIndicator(props: CheckboxPrimitiveIndicatorProps) {
  const { style, ...viewProps } = props;
  const { value, state, styles } = useCheckboxContext();

  const indicatorState = calculateState(state, value);

  const calculatedStyle = [styles?.indicator?.default, styles?.indicator?.[indicatorState], style];
  const checkmarkStyle = [styles?.checkmark?.default, styles?.checkmark?.[indicatorState]];

  return (
    <View {...viewProps} style={calculatedStyle}>
      {value && <Text style={checkmarkStyle}>✓</Text>}
    </View>
  );
}
