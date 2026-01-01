import { calculateComposedStyles } from "@/utils/calculate-styles";
import React from "react";
import { type StyleProp, Text, type TextStyle } from "react-native";
import { useCard } from "./context";

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
