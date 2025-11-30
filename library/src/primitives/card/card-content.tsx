import React from "react";
import { StyleProp, View, ViewStyle } from "react-native";
import { useCard } from "./context";
import { calculateComposedStyles } from "../../utils/calculate-styles";

export interface CardContentProps {
  children?: React.ReactNode;

  render?: (props: CardContentProps) => React.ReactNode;

  style?: StyleProp<ViewStyle>;
}

export function CardContent(props: CardContentProps) {
  const card = useCard();

  const composedStyle = calculateComposedStyles(card.styles, card.state, "content", props.style);

  const Component = props.render ?? View;
  return <Component {...props} style={composedStyle} />;
}
