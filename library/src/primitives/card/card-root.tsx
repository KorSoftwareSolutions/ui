import React from "react";
import { StyleProp, View, ViewStyle } from "react-native";
import { CardStyles } from "./types";
import { calculateComposedStyles } from "@/utils/calculate-styles";
import { CardContext } from "./context";

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
