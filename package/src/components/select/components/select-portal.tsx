import React, { useEffect } from "react";
import { View } from "react-native";
import { Portal } from "../../portal";
import { SelectContext, useSelect } from "../context";

export interface SelectPortalProps {
  children?: React.ReactNode;
}

export function SelectPortal(props: SelectPortalProps) {
  const select = useSelect();

  useEffect(() => {
    return () => {
      select.setOptions([]);
    };
  }, []);

  if (!select.isOpen) {
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
    <Portal name="select-portal">
      <SelectContext.Provider value={select}>
        {props.children}
      </SelectContext.Provider>
    </Portal>
  );
}
