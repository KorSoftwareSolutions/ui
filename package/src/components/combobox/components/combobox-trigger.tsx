import React, { useEffect, useRef } from "react";
import { StyleSheet, TextInput, type TextInputProps } from "react-native";
import type { TextInputRef } from "../../../types/element.types";
import { setInnerInputValue } from "../../../utils/input-utils";
import { measureLayoutPosition } from "../../../utils/normalize-layout";
import { useCombobox } from "../context";
import type { ComboboxTriggerState } from "../types";

export interface ComboboxTriggerProps {
  placeholder?: string;
}

const calculateState = (
  isDisabled: boolean,
  isOpen: boolean,
): ComboboxTriggerState => {
  if (isDisabled) return "disabled";
  if (isOpen) return "focused";
  return "default";
};

export function ComboboxTrigger(props: ComboboxTriggerProps) {
  const combobox = useCombobox();
  const triggerRef = useRef<TextInputRef>(null);

  const triggerState = calculateState(combobox.isDisabled, combobox.isOpen);
  const selectedOption = combobox.options.find(
    (option) => option.value === combobox.value,
  );

  const displayValue = combobox.isOpen
    ? combobox.searchQuery
    : selectedOption
      ? typeof selectedOption.label === "string"
        ? selectedOption.label
        : selectedOption.value
      : "";

  const open = () => {
    if (combobox.isDisabled) return;
    combobox.setSearchQuery("");
    requestAnimationFrame(() => {
      measureLayoutPosition(triggerRef.current, (layout) => {
        combobox.setTriggerPosition(layout);
        combobox.setIsOpen(true);
      });
    });
  };

  useEffect(() => {
    if (!triggerRef.current) return;
    setInnerInputValue(triggerRef.current, displayValue);
  }, [displayValue]);

  useEffect(() => {
    if (!combobox.isOpen) {
      triggerRef.current?.blur();
    }
  }, [combobox.isOpen]);

  const triggerStyles = combobox.styles?.trigger;
  const composedProps: TextInputProps = {
    ...triggerStyles?.default,
    ...triggerStyles?.[triggerState],
    ...props,
    style: StyleSheet.flatten([
      triggerStyles?.default?.style,
      triggerStyles?.[triggerState]?.style,
    ]),
  };

  const composedStyle = StyleSheet.flatten([
    triggerStyles?.default?.style,
    triggerStyles?.[triggerState]?.style,
  ]);

  return (
    <TextInput
      {...composedProps}
      ref={triggerRef}
      value={undefined}
      onChange={undefined}
      onChangeText={(text) => {
        if (combobox.isDisabled) return;
        combobox.setSearchQuery(text);
        if (!combobox.isOpen) {
          open();
        }
      }}
      onFocus={() => {
        if (!combobox.isOpen) {
          open();
        }
      }}
      style={composedStyle}
    />
  );
}
