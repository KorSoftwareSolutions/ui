import type { PropsWithRender } from "@/types/props.types";
import React from "react";
import { type StyleProp, View, type ViewStyle } from "react-native";
import { AlertContext } from "../context";
import { AlertVariants } from "../variants";

export interface AlertRootProps {
  variant?: keyof typeof AlertVariants;
  children?: React.ReactNode;

  style?: StyleProp<ViewStyle>;
}

export function AlertRoot(props: PropsWithRender<AlertRootProps>) {
  const variantStyles = AlertVariants[props.variant ?? "default"]();
  const composedStyle: StyleProp<ViewStyle> = [variantStyles.root, props.style];

  const Component = props.render ?? View;
  return (
    <AlertContext.Provider
      value={{
        styles: variantStyles,
      }}
    >
      <Component {...props} style={composedStyle} />
    </AlertContext.Provider>
  );
}
