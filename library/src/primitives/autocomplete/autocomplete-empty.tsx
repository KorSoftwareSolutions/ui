import { calculateComposedStyles } from "@/utils/calculate-styles";
import React from "react";
import { type StyleProp, Text, type TextStyle } from "react-native";
import { useAutocomplete } from "./context";

export interface AutocompleteEmptyProps {
  children?: React.ReactNode;
  style?: StyleProp<TextStyle>;
  render?: (props: AutocompleteEmptyProps) => React.ReactElement;
}

export function AutocompleteEmpty(props: AutocompleteEmptyProps) {
  const autocomplete = useAutocomplete();

  const composedStyles = calculateComposedStyles(autocomplete.styles, autocomplete.state, "empty", props.style);

  const Component = props.render ?? Text;
  return <Component style={composedStyles}>{props.children}</Component>;
}
