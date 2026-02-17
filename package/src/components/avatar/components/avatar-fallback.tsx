import React from "react";
import { Text, type StyleProp, type TextStyle } from "react-native";
import { useAvatar } from "../context";

export interface AvatarFallbackProps {
  children: string | string[];
  style?: StyleProp<TextStyle>;
}

export function AvatarFallback(props: AvatarFallbackProps) {
  const avatar = useAvatar();

  if (avatar.imageLoaded) {
    return null;
  }

  const composedStyles = [avatar.styles?.fallback, props.style];
  return <Text {...props} style={composedStyles} />;
}
