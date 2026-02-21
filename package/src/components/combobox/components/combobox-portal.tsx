import React from "react";
import { View } from "react-native";
import { Portal } from "../../portal";
import { ComboboxContext, useCombobox } from "../context";

export interface ComboboxPortalProps {
  children?: React.ReactNode;
}

export function ComboboxPortal(props: ComboboxPortalProps) {
  const combobox = useCombobox();

  if (!combobox.isOpen) {
    return (
      <View
        style={{ display: "none" }}
        aria-hidden
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
      >
        {props.children}
      </View>
    );
  }

  return (
    <Portal name="combobox-portal">
      <ComboboxContext.Provider value={combobox}>
        {props.children}
      </ComboboxContext.Provider>
    </Portal>
  );
}
