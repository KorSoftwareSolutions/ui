import React from "react";
import { type StyleProp, StyleSheet, View, type ViewStyle } from "react-native";
import { useComponentConfig } from "../../../themes/provider";
import type { PropsWithRender } from "../../../types/props.types";
import { mergeStyles } from "../../../utils/calculate-styles";
import { AlertContext } from "../context";
import { AlertVariants } from "../variants";

export interface AlertRootProps {
  variant?: keyof typeof AlertVariants;
  children?: React.ReactNode;

  style?: StyleProp<ViewStyle>;
}

export function AlertRoot(props: PropsWithRender<AlertRootProps>) {
  const variantStyles = AlertVariants[props.variant ?? "default"]();
  const componentConfig = useComponentConfig("alert");

  const mergedStyles = mergeStyles(variantStyles, componentConfig?.styles);
  const composedStyle = StyleSheet.flatten([mergedStyles.root, props.style]);

  const Component = props.render ?? View;
  return (
    <AlertContext.Provider
      value={{
        styles: mergedStyles,
      }}
    >
      <Component {...props} style={composedStyle} />
    </AlertContext.Provider>
  );
}
