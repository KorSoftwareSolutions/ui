import React from "react";
import { StyleProp, View, ViewStyle } from "react-native";
import { useCard } from "./context";
import { calculateComposedStyles } from "@/utils/calculate-styles";

export interface CardBodyProps {
  children?: React.ReactNode;

  render?: (props: CardBodyProps) => React.ReactNode;

  style?: StyleProp<ViewStyle>;
}

export function CardBody(props: CardBodyProps) {
  const card = useCard();

  const composedStyle = calculateComposedStyles(card.styles, card.state, "body", props.style);

  const Component = props.render ?? View;
  return <Component {...props} style={composedStyle} />;
}
