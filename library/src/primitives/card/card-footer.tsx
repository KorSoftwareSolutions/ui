import React from "react";
import { StyleProp, View, ViewStyle } from "react-native";
import { useCard } from "./context";
import { calculateComposedStyles } from "@/utils/calculate-styles";

export interface CardFooterProps {
  children?: React.ReactNode;

  render?: (props: CardFooterProps) => React.ReactNode;

  style?: StyleProp<ViewStyle>;
}

export function CardFooter(props: CardFooterProps) {
  const card = useCard();

  const composedStyle = calculateComposedStyles(card.styles, card.state, "footer", props.style);

  const Component = props.render ?? View;
  return <Component {...props} style={composedStyle} />;
}
