import { useRelativePosition } from "@/hooks/use-relative-position";
import { useSafeAreaInsets } from "@/safe-area";
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
  const safeAreaInsets = useSafeAreaInsets();

  const positionStyle = useRelativePosition({
    align: "start",
    avoidCollisions: true,
    triggerPosition: autocomplete.inputPosition,
    contentLayout: autocomplete.contentLayout,
    alignOffset: 0,
    side: "bottom",
    sideOffset: 0,
    insets: safeAreaInsets,
  });
  return (
    <ScrollView
      onLayout={(e) => {
        autocomplete.setContentLayout(e.nativeEvent.layout);
      }}
      keyboardShouldPersistTaps="handled"
      style={[
        positionStyle,
        composedStyles,
        {
          display: autocomplete.isOpen ? "flex" : "none",
          width: autocomplete.inputPosition.width,
          pointerEvents: "box-none",
        },
      ]}
    >
      {props.children}
    </ScrollView>
  );
}
