import React from "react";
import { StyleProp, Text, TextStyle } from "react-native";
import { useCard } from "./context";
import { calculateComposedStyles } from "@/utils/calculate-styles";

export interface CardTitleProps {
  children?: string;

  render?: (props: CardTitleProps) => React.ReactNode;

  style?: StyleProp<TextStyle>;
}

export function CardTitle(props: CardTitleProps) {
  const card = useCard();

  const composedStyle = calculateComposedStyles(card.styles, card.state, "title", props.style);

  const Component = props.render ?? Text;
  return <Component {...props} style={composedStyle} />;
}
