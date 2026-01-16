import { calculateComposedStyles } from "@/utils/calculate-styles";
import React from "react";
import { Pressable, type StyleProp, StyleSheet, type ViewStyle } from "react-native";
import { useAutocomplete } from "./context";

export interface AutocompleteOverlayProps {
  children?: React.ReactNode;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  render?: (props: AutocompleteOverlayProps) => React.ReactElement;
}

export function AutocompleteOverlay(props: AutocompleteOverlayProps) {
  const autocomplete = useAutocomplete();

  const composedStyles = calculateComposedStyles(autocomplete.styles, autocomplete.state, "overlay", props.style);

  const Component = props.render ?? Pressable;
  return (
    <Component
      onPress={() => {
        autocomplete.setIsOpen(false);
      }}
      style={[StyleSheet.absoluteFill, composedStyles]}
    >
      {props.children}
    </Component>
  );
}
