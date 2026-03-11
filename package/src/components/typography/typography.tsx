import React from "react";
import { Text as RnText, StyleSheet, type TextProps as RnTextProps } from "react-native";
import type { Size } from "../../utils/size-scale";
import { TypographyVariants } from "./variants";

export interface TypographyProps extends RnTextProps {
  variant?: keyof typeof TypographyVariants;
  size?: Size;
}

export function Typography(props: TypographyProps) {
  const { variant = "body", size = "md", ...rest } = props;
  const variantStyles = TypographyVariants[variant](size);

  const combinedStyles = StyleSheet.flatten([variantStyles, props.style]);

  return <RnText {...rest} style={combinedStyles} />;
}
