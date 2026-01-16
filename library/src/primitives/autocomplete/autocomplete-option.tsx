import { calculateComposedStyles } from "@/utils/calculate-styles";
import { useEffect, useState } from "react";
import { type StyleProp, Text, type TextStyle } from "react-native";
import { useAutocomplete } from "./context";
import type { AutocompleteOptionState, AutocompleteState } from "./types";

export interface AutocompleteOptionProps {
  children: string;
  value: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  render?: (props: AutocompleteOptionProps) => React.ReactElement;
  style?: StyleProp<TextStyle>;
}

const calculateState = (autocompleteState: AutocompleteState, hovered: boolean, selected: boolean): AutocompleteOptionState => {
  if (autocompleteState === "disabled") {
    return "disabled";
  }
  if (selected) {
    return "selected";
  }
  if (hovered) {
    return "hovered";
  }
  return "default";
};

export function AutocompleteOption(props: AutocompleteOptionProps) {
  const [isHovered, setIsHovered] = useState(false);
  const autocomplete = useAutocomplete();
  const isSelected = autocomplete.value === props.value;

  const optionState = calculateState(autocomplete.state, isHovered, isSelected);
  const composedStyles = calculateComposedStyles(autocomplete.styles, optionState, "option", props.style);

  useEffect(() => {
    autocomplete.setOptions((prev) => {
      if (prev.find((option) => option.value === props.value)) {
        return prev;
      }
      return [...prev, { value: props.value, label: props.children }];
    });
  }, [props.value, props.children]);

  const handlePress = () => {
    autocomplete.onChange?.(props.value);
    autocomplete.setInputValue?.("");
    autocomplete.setInputDisplayValue(props.children);
    autocomplete.setIsOpen(false);
    autocomplete.blurInput();
  };

  const Component = props.render ?? Text;
  return (
    <Component
      value={props.value}
      onPress={handlePress}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={composedStyles}
    >
      {props.children}
    </Component>
  );
}
