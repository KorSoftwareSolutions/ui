import { calculateComposedStyles } from "../../../utils/calculate-styles";
import React from "react";
import { type StyleProp, Text, type TextStyle } from "react-native";
import { useBadge } from "../context";

export interface BadgeLabelProps {
  children?: string;

  render?: (props: BadgeLabelProps) => React.ReactNode;

  style?: StyleProp<TextStyle>;
}

export function BadgeLabel(props: BadgeLabelProps) {
  const badge = useBadge();

  const composedStyle = calculateComposedStyles(badge.styles, badge.state, "label", props.style);

  const Component = props.render ?? Text;
  return <Component {...props} style={composedStyle} />;
}
