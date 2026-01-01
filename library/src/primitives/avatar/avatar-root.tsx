import React from "react";
import { type StyleProp, View, type ViewStyle } from "react-native";
import { AvatarContext } from "./context";
import type { AvatarStyles } from "./types";

export interface AvatarRootProps {
  children: React.ReactNode;
  render?: (props: AvatarRootProps) => React.ReactNode;
  style?: StyleProp<ViewStyle>;
  styles?: AvatarStyles;
}

export function AvatarRoot(props: AvatarRootProps) {
  const composedStyles = [props.styles?.root, props.style];
  const Component = props.render ?? View;
  return (
    <AvatarContext.Provider value={{ styles: props.styles }}>
      <Component {...props} style={composedStyles} />
    </AvatarContext.Provider>
  );
}
