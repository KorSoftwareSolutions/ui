import React from "react";
import { type StyleProp, type TextStyle, View } from "react-native";
import { useAvatar } from "./context";

export interface AvatarFallbackProps {
  children: string;
  render?: (props: AvatarFallbackProps) => React.ReactNode;
  style?: StyleProp<TextStyle>;
}

export function AvatarFallback(props: AvatarFallbackProps) {
  const avatar = useAvatar();
  const composedStyles = [avatar.styles?.fallback, props.style];
  const Component = props.render ?? View;
  return <Component {...props} style={composedStyles} />;
}
