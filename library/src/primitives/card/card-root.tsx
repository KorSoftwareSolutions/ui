import { calculateComposedStyles } from "@/utils/calculate-styles";
import React from "react";
import { type StyleProp, View, type ViewStyle } from "react-native";
import { CardContext } from "./context";
import type { CardStyles } from "./types";

export interface CardRootProps {
  children?: React.ReactNode;

  render?: (props: CardRootProps) => React.ReactNode;

  style?: StyleProp<ViewStyle>;
  styles?: CardStyles;
}

export function CardRoot(props: CardRootProps) {
  const composedStyle = calculateComposedStyles(props.styles, "default", "root", props.style);

  const Component = props.render ?? View;
  return (
    <CardContext.Provider
      value={{
        state: "default",
        styles: props.styles,
      }}
    >
      <Component {...props} style={composedStyle} />
    </CardContext.Provider>
  );
}
