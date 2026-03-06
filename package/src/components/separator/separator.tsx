import React from "react";
import { View, type StyleProp, type ViewStyle } from "react-native";
import { useComponentConfig } from "../../themes/provider";
import { mergeStyles } from "../../utils/calculate-styles";
import { SeparatorVariants } from "./variants";

export interface SeparatorProps {
  variant?: keyof typeof SeparatorVariants;
  style?: StyleProp<ViewStyle>;
}

export function Separator(props: SeparatorProps) {
  const { variant = "horizontal", style } = props;
  const variantStyles = SeparatorVariants[variant]();
  const componentConfig = useComponentConfig("separator");
  const mergedStyles = mergeStyles(variantStyles, componentConfig?.styles);

  return <View style={[mergedStyles.root, style]} />;
}
