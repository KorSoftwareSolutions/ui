import React from "react";
import { StyleSheet, Text } from "react-native";
import { useCombobox } from "../context";

export interface ComboboxEmptyProps {
  children?: string;
  render: () => React.ReactNode;
}

export function ComboboxEmpty(props: ComboboxEmptyProps) {
  const combobox = useCombobox();

  const hasVisibleOptions = combobox.options.some((option) =>
    combobox.filter(option.value, combobox.searchQuery),
  );

  if (hasVisibleOptions) {
    return null;
  }

  if (props.render) {
    return <>{props.render()}</>;
  }

  const composedStyles = StyleSheet.flatten([
    combobox.styles.empty?.default,
    combobox.styles.empty?.[combobox.state],
  ]);

  return <Text style={composedStyles}>{props.children}</Text>;
}
