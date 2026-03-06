import React from "react";
import { type StyleProp, View, type ViewStyle } from "react-native";
import { useComponentConfig } from "../../../themes/provider";
import { mergeStyles } from "../../../utils/calculate-styles";
import { ToastContext } from "../context";
import { ToastVariants } from "../variants";

export interface ToastRootProps {
  variant?: keyof typeof ToastVariants;
  children?: React.ReactNode;

  render?: (props: ToastRootProps) => React.ReactNode;

  style?: StyleProp<ViewStyle>;
}

export function ToastRoot(props: ToastRootProps) {
  const variantStyles = ToastVariants[props.variant ?? "default"]();
  const componentConfig = useComponentConfig("toast");
  const mergedStyles = mergeStyles(variantStyles, componentConfig?.styles);
  const composedStyle = [mergedStyles.root, props.style];

  const Component = props.render ?? View;
  return (
    <ToastContext.Provider
      value={{
        styles: mergedStyles,
      }}
    >
      <Component {...props} style={composedStyle} />
    </ToastContext.Provider>
  );
}
