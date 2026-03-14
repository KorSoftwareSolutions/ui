import React from "react";
import { type StyleProp, StyleSheet, Text, type TextStyle } from "react-native";
import type { TextChildren } from "../../types/element.types";
import type { PropsWithRender } from "../../types/props.types";
import { useCard } from "./context";

export interface CardTitleProps {
  children?: TextChildren;

  style?: StyleProp<TextStyle>;
}

export function CardTitle(props: PropsWithRender<CardTitleProps>) {
  const card = useCard();

  const composedStyle: StyleProp<TextStyle> = StyleSheet.flatten([
    card.styles?.title?.default,
    card.styles?.title?.[card.state],
    props.style,
  ]);

  const Component = props.render ?? Text;
  return <Component {...props} style={composedStyle} />;
}
