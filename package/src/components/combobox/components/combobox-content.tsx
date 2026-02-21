import React from "react";
import {
  ScrollView,
  StyleSheet,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import { useRelativePosition } from "../../../hooks/use-relative-position";
import { useCombobox } from "../context";

export interface ComboboxContentProps {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export function ComboboxContent(props: ComboboxContentProps) {
  const combobox = useCombobox();
  const composedStyles = StyleSheet.flatten([
    combobox.styles?.content?.default,
    combobox.styles?.content?.[combobox.state],
    props.style,
  ]);

  const flatStyles = StyleSheet.flatten(composedStyles);

  const positionStyle = useRelativePosition({
    align: "start",
    triggerPosition: combobox.triggerPosition,
    contentLayout: combobox.contentLayout,
    alignOffset: 0,
    preferredSide: "bottom",
    sideOffset: 2,
  });

  return (
    <ScrollView
      style={[
        positionStyle,
        flatStyles,
        { width: combobox.triggerPosition.width },
      ]}
      onLayout={(e) => {
        combobox.setContentLayout(e.nativeEvent.layout);
      }}
      keyboardShouldPersistTaps="handled"
      nestedScrollEnabled
    >
      {props.children}
    </ScrollView>
  );
}
