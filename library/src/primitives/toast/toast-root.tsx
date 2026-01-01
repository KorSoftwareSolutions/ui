import React from "react";
import { type StyleProp, View, type ViewStyle } from "react-native";
import { ToastContext } from "./context";
import type { ToastStyles } from "./types";

export interface ToastRootProps {
  children?: React.ReactNode;

  render?: (props: ToastRootProps) => React.ReactNode;

  style?: StyleProp<ViewStyle>;
  styles?: ToastStyles;
}

export function ToastRoot(props: ToastRootProps) {
  const composedStyle = [props.styles?.root, props.style];

  const Component = props.render ?? View;
  return (
    <ToastContext.Provider
      value={{
        styles: props.styles,
      }}
    >
      <Component {...props} style={composedStyle} />
    </ToastContext.Provider>
  );
}
