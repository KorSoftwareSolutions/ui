import React from "react";
import { Text as RnText, TextProps as RnTextProps } from "react-native";
import { TextVariants } from "./variants";

export interface TextProps extends RnTextProps {
  variant?: keyof typeof TextVariants;
}

export function Text(props: TextProps) {
  const useVariantStyles = TextVariants[props.variant ?? "default"];
  const variantStyles = useVariantStyles();
  return <RnText {...props} style={variantStyles} />;
}
