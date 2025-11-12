import React from "react";
import { View } from "react-native";
import { Portal } from "../portal";

interface SelectContentProps {
  children?: React.ReactNode;

  render?: (props: SelectContentProps) => React.ReactElement;
}

export function SelectContent(props: SelectContentProps) {
  const Component = props.render ?? View;
  return (
    <Portal name="select-content">
      <Component>{props.children}</Component>
    </Portal>
  );
}
