import React from "react";
import { Text, type StyleProp, type TextStyle } from "react-native";
import { useAvatar } from "./context";

export interface AvatarFallbackProps {
  children: string;
  style?: StyleProp<TextStyle>;
}

export function AvatarFallback(props: AvatarFallbackProps) {
  const avatar = useAvatar();
  const composedStyles = [avatar.styles?.fallback, props.style];
  return <Text {...props} style={composedStyles} />;
}
