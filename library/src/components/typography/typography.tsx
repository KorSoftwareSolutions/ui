import React from "react";
import { Text as RnText, type TextProps as RnTextProps } from "react-native";
import { TypographyVariants } from "./variants";

export interface TypographyProps extends RnTextProps {
  variant?: keyof typeof TypographyVariants;
}

export function Typography(props: TypographyProps) {
  const useVariantStyles = TypographyVariants[props.variant ?? "body-md"];
  const variantStyles = useVariantStyles();
  return <RnText {...props} style={variantStyles} />;
}
