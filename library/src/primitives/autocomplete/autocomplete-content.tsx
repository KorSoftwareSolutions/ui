import { useRelativePosition } from "@/hooks/use-relative-position";
import { calculateComposedStyles } from "@/utils/calculate-styles";
import React from "react";
import { ScrollView, type StyleProp, type ViewStyle } from "react-native";
import { useAutocomplete } from "./context";

export interface AutocompleteContentProps {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export function AutocompleteContent(props: AutocompleteContentProps) {
  const autocomplete = useAutocomplete();
  const composedStyles = calculateComposedStyles(autocomplete.styles, autocomplete.state, "content", props.style);

  const positionStyle = useRelativePosition({
    align: "start",
    avoidCollisions: true,
    triggerPosition: autocomplete.inputPosition,
    contentLayout: autocomplete.contentLayout,
    alignOffset: 0,
    side: "bottom",
    sideOffset: 0,
  });

  return (
    <ScrollView
      style={[positionStyle, composedStyles, { width: autocomplete.inputPosition.width }]}
      onLayout={(e) => {
        autocomplete.setContentLayout(e.nativeEvent.layout);
      }}
      pointerEvents="box-none"
      keyboardShouldPersistTaps="handled"
    >
      {props.children}
    </ScrollView>
  );
}
