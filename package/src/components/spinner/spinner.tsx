import React from "react";
import { ActivityIndicator, type ColorValue, type StyleProp, type ViewStyle } from "react-native";
import { useComponentConfig } from "../../themes/provider";
import { mergeStyles } from "../../utils/calculate-styles";
import { SpinnerVariants } from "./variants";

export interface SpinnerProps {
  size?: number;
  color?: ColorValue;
  variant?: keyof typeof SpinnerVariants;
  style?: StyleProp<ViewStyle>;
}

export function Spinner(props: SpinnerProps) {
  const { size, variant = "default", color, style } = props;
  const styles = SpinnerVariants[variant]();
  const componentConfig = useComponentConfig("spinner");
  const mergedStyles = mergeStyles(styles, componentConfig?.styles);

  return (
    <ActivityIndicator
      size={size ?? mergedStyles.size}
      color={color ?? mergedStyles.color}
      style={[mergedStyles, style]}
    />
  );
}
