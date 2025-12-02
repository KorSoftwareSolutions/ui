import React from "react";
import { StyleProp, View, ViewStyle } from "react-native";
import { useCard } from "./context";
import { calculateComposedStyles } from "@/utils/calculate-styles";

export interface CardHeaderProps {
  children?: React.ReactNode;

  render?: (props: CardHeaderProps) => React.ReactNode;

  style?: StyleProp<ViewStyle>;
}

export function CardHeader(props: CardHeaderProps) {
  const card = useCard();

  const composedStyle = calculateComposedStyles(card.styles, card.state, "header", props.style);

  const Component = props.render ?? View;
  return <Component {...props} style={composedStyle} />;
}
