import { calculateComposedStyles } from "@/utils/calculate-styles";
import React from "react";
import { Pressable, type StyleProp, StyleSheet, type ViewStyle } from "react-native";
import { useAutocomplete } from "../context";

export interface AutocompleteOverlayProps {
  children?: React.ReactNode;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

export function AutocompleteOverlay(props: AutocompleteOverlayProps) {
  const autocomplete = useAutocomplete();

  const composedStyles = calculateComposedStyles(autocomplete.styles, autocomplete.state, "overlay", props.style);

  const handlePress = () => {
    props.onPress?.();
    autocomplete.setIsOpen(false);
    autocomplete.inputRef?.blur();
  };

  return (
    <Pressable
      onPress={handlePress}
      style={[
        StyleSheet.absoluteFill,
        composedStyles,
        {
          display: autocomplete.isOpen ? "flex" : "none",
        },
      ]}
    >
      {props.children}
    </Pressable>
  );
}
