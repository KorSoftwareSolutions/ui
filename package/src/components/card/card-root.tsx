import type { PropsWithRender } from "../../types/props.types";
import { calculateComposedStyles } from "../../utils/calculate-styles";
import React from "react";
import { type StyleProp, View, type ViewStyle } from "react-native";
import { CardContext } from "./context";
import { CardVariants } from "./variants";

export interface CardRootProps {
  variant?: keyof typeof CardVariants;
  children?: React.ReactNode;

  style?: StyleProp<ViewStyle>;
}

export function CardRoot(props: PropsWithRender<CardRootProps>) {
  const variantStyles = CardVariants[props.variant || "default"]();

  const composedStyle = calculateComposedStyles(variantStyles, "default", "root", props.style);

  const Component = props.render ?? View;
  return (
    <CardContext.Provider
      value={{
        state: "default",
        styles: variantStyles,
      }}
    >
      <Component {...props} style={composedStyle} />
    </CardContext.Provider>
  );
}
