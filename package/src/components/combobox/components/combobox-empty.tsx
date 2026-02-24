import React from "react";
import { StyleSheet, Text } from "react-native";
import type { TextChildren } from "../../../types/element.types";
import { useCombobox } from "../context";

export interface ComboboxEmptyProps {
  children?: TextChildren;
}

export function ComboboxEmpty(props: ComboboxEmptyProps) {
  const combobox = useCombobox();

  const composedStyles = StyleSheet.flatten([
    combobox.styles.empty?.default,
    combobox.styles.empty?.[combobox.state],
  ]);

  return <Text style={composedStyles}>{props.children}</Text>;
}
