import React from "react";
import { type StyleProp, View, type ViewStyle } from "react-native";
import { useComponentConfig } from "../../themes/provider";
import type { PropsWithRender } from "../../types/props.types";
import { calculateComposedStyles, mergeStyles } from "../../utils/calculate-styles";
import { CardContext } from "./context";
import { CardVariants } from "./variants";

export interface CardRootProps {
  variant?: keyof typeof CardVariants;
  children?: React.ReactNode;

  style?: StyleProp<ViewStyle>;
}

export function CardRoot(props: PropsWithRender<CardRootProps>) {
  const variantStyles = CardVariants[props.variant || "default"]();
  const componentConfig = useComponentConfig("card");

  const mergedStyles = mergeStyles(variantStyles, componentConfig?.styles);

  const composedStyle = calculateComposedStyles(mergedStyles, "default", "root", props.style);

  const Component = props.render ?? View;
  return (
    <CardContext.Provider
      value={{
        state: "default",
        styles: mergedStyles,
      }}
    >
      <Component {...props} style={composedStyle} />
    </CardContext.Provider>
  );
}
