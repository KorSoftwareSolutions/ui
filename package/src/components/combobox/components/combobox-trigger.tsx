import React, { useEffect, useRef } from "react";
import { StyleSheet, TextInput, type TextInputProps } from "react-native";
import type { TextInputRef } from "../../../types/element.types";
import { setInnerInputValue } from "../../../utils/input-utils";
import { measureLayoutPosition } from "../../../utils/normalize-layout";
import { useCombobox } from "../context";
import type { ComboboxTriggerState } from "../types";

type ExtendableProps = Omit<TextInputProps, "value" | "onChange" | "onChangeText">;

type RenderProps = {
  inputRef: React.RefObject<TextInputRef | null>;
  open: () => void;
  setInputValue: (value: string) => void;
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
  const triggerRef = useRef<TextInputRef>(null);

  const triggerState = calculateState(combobox.isDisabled, combobox.isOpen);
  const selectedLabel = combobox.value != null ? combobox.getItemLabel(combobox.value) : "";
  const displayValue = combobox.isOpen ? combobox.inputValue : selectedLabel;

  const open = () => {
    if (combobox.isDisabled) return;
    combobox.setInputValue(selectedLabel);
    requestAnimationFrame(() => {
      measureLayoutPosition(triggerRef.current, (layout) => {
        combobox.setTriggerPosition(layout);
        combobox.setIsOpen(true);
      });
    });
  };

  const onChangeText = (text: string) => {
    if (combobox.isDisabled) return;
    combobox.setInputValue(text);
    if (!combobox.isOpen) open();
  };

  const onFocus = () => {
    if (!combobox.isOpen) open();
  };

  const setInputValue = (value: string) => {
    combobox.setInputValue(value);
    if (triggerRef.current) {
      setInnerInputValue(triggerRef.current, value);
    }
  };

  useEffect(() => {
    setInputValue(displayValue);
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
    props.style,
  ]);

  if (render) {
    return render({
      inputRef: triggerRef,
      open,
      setInputValue,
    });
  }

  return (
    <TextInput
      {...composedProps}
      ref={triggerRef}
      value={undefined}
      onChange={undefined}
      onChangeText={onChangeText}
      onFocus={onFocus}
      style={composedStyle}
    />
  );
}
