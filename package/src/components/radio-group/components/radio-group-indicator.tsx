import React from "react";
import { View, type StyleProp, type ViewProps, type ViewStyle } from "react-native";
import { useRadioGroupContext } from "../context";
import { useRadioGroupItemContext } from "./radio-group-item";

export interface RadioGroupIndicatorProps extends ViewProps {
  style?: StyleProp<ViewStyle>;
  dotStyle?: StyleProp<ViewStyle>;
}

export function RadioGroupIndicator(props: RadioGroupIndicatorProps) {
  const { style, dotStyle, ...viewProps } = props;
  const { styles } = useRadioGroupContext();
  const { state, isSelected } = useRadioGroupItemContext();

  const indicatorStyle = [styles?.indicator?.default, styles?.indicator?.[state], style];
  const computedDotStyle = [styles?.dot?.default, dotStyle];

  return (
    <View {...viewProps} style={indicatorStyle}>
      {isSelected && <View style={computedDotStyle} />}
    </View>
  );
}
