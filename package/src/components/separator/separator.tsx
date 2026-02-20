import React from "react";
import { View, type StyleProp, type ViewStyle } from "react-native";
import { SeparatorVariants } from "./variants";

export interface SeparatorProps {
  variant?: keyof typeof SeparatorVariants;
  style?: StyleProp<ViewStyle>;
}

export function Separator(props: SeparatorProps) {
  const { variant = "horizontal", style } = props;
  const variantStyles = SeparatorVariants[variant]();

  return <View style={[variantStyles.root, style]} />;
}
