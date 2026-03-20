import React from "react";
import { StyleSheet, TextInput, type TextInputProps } from "react-native";
import type { TextInputRef } from "../../../types/element.types";
import { measureLayoutPosition } from "../../../utils/normalize-layout";
import { useCombobox } from "../context";
import type { ComboboxTriggerState } from "../types";

type ExtendableProps = Omit<TextInputProps, "value" | "onChange" | "onChangeText">;

type RenderProps = {
  inputRef: React.RefObject<TextInputRef | null>;
  open: () => void;
  value: string;
  onChange: (value: string) => void;
};

export type ComboboxTriggerProps = ExtendableProps & {
  render?: (props: RenderProps) => React.ReactNode;
};

const calculateState = (isDisabled: boolean, isOpen: boolean): ComboboxTriggerState => {
  if (isDisabled) return "disabled";
  if (isOpen) return "focused";
  return "default";
};

export function ComboboxTrigger({ render, ...props }: ComboboxTriggerProps) {
  const combobox = useCombobox();

  const triggerState = calculateState(combobox.isDisabled, combobox.isOpen);

  const open = () => {
    if (combobox.isDisabled) return;
    requestAnimationFrame(() => {
      measureLayoutPosition(combobox.inputRef.current, (layout) => {
        combobox.setTriggerPosition(layout);
        combobox.setIsOpen(true);
      });
    });
  };

  const onFocus: TextInputProps["onFocus"] = (e) => {
    props.onFocus?.(e);
    open();
  };

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
    props.style,
  ]);

  if (render) {
    return render({
      inputRef: combobox.inputRef,
      open,
      value: combobox.inputValue,
      onChange: combobox.onInputChange,
    });
  }

  return (
    <TextInput
      {...composedProps}
      ref={combobox.inputRef}
      value={combobox.inputValue}
      onChange={undefined}
      onChangeText={combobox.onInputChange}
      onFocus={onFocus}
      style={composedStyle}
    />
  );
}
