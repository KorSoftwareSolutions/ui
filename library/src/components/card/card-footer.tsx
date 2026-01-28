import type { PropsWithRender } from "@/types/props.types";
import { calculateComposedStyles } from "@/utils/calculate-styles";
import React from "react";
import { type StyleProp, View, type ViewStyle } from "react-native";
import { useCard } from "./context";

export interface CardFooterProps {
  children?: React.ReactNode;

  style?: StyleProp<ViewStyle>;
}

export function CardFooter(props: PropsWithRender<CardFooterProps>) {
  const card = useCard();

  const composedStyle = calculateComposedStyles(card.styles, card.state, "footer", props.style);

  const Component = props.render ?? View;
  return <Component {...props} style={composedStyle} />;
}
