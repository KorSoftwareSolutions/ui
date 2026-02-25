import React from "react";
import {
  ActivityIndicator,
  type ColorValue,
  type StyleProp,
  type ViewStyle,
} from "react-native";
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

  return (
    <ActivityIndicator
      size={size ?? styles.size}
      color={color ?? styles.color}
      style={[styles, style]}
    />
  );
}
