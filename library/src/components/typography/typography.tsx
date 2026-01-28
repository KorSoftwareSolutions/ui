import React from "react";
import { Text as RnText, type TextProps as RnTextProps } from "react-native";
import { TypographyVariants } from "./variants";

export interface TypographyProps extends RnTextProps {
  variant?: keyof typeof TypographyVariants;
}

export function Typography(props: TypographyProps) {
  const variantStyles = TypographyVariants[props.variant ?? "body-md"]();

  const combinedStyles = [variantStyles, props.style];

  return <RnText {...props} style={combinedStyles} />;
}
