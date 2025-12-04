import React from "react";
import { StyleProp, View, ViewStyle } from "react-native";
import { ToastStyles } from "./types";
import { ToastContext } from "./context";

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
