import React from "react";
import { StyleProp, View, ViewStyle } from "react-native";
import { EmptyContext } from "./context";
import { EmptyStyles } from "./types";

export interface EmptyRootProps {
  children: React.ReactNode;
  render?: (props: EmptyRootProps) => React.ReactNode;
  style?: StyleProp<ViewStyle>;
  styles?: EmptyStyles;
}

export function EmptyRoot(props: EmptyRootProps) {
  const composedStyles = [props.styles?.root, props.style];
  const Component = props.render ?? View;
  return (
    <EmptyContext.Provider value={{ styles: props.styles }}>
      <Component {...props} style={composedStyles} />
    </EmptyContext.Provider>
  );
}
