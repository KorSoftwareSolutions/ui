import { useState } from "react";
import { TextInput, type TextInputProps } from "react-native";
import { useComponentConfig } from "../../themes/provider";
import { mergeStyles } from "../../utils/calculate-styles";
import type { TextareaState } from "./types";
import { TextareaVariants } from "./variants";

export type TextareaBaseProps = Omit<TextInputProps, "onChange"> & {
  onChange?: TextInputProps["onChangeText"];

  isDisabled?: boolean;
};

export interface TextareaProps extends TextareaBaseProps {
  variant?: keyof typeof TextareaVariants;
  render?: (props: TextareaProps) => React.ReactNode;
}

const calculateState = (props: TextareaProps, isFocused: boolean): TextareaState => {
  if (props.isDisabled) {
    return "disabled";
  }
  if (isFocused) {
    return "focused";
  }
  return "default";
};

export function Textarea(props: TextareaProps) {
  const variantStyles = TextareaVariants[props.variant ?? "default"]();
  const componentConfig = useComponentConfig("textarea");
  const mergedStyles = mergeStyles(variantStyles, componentConfig?.styles);

  const [isFocused, setIsFocused] = useState(false);
  const state = calculateState(props, isFocused);

  const composedStyles = [mergedStyles.default?.style, mergedStyles[state]?.style, props.style];
  const composedProps = {
    ...mergedStyles.default,
    ...mergedStyles[state],
    ...props,
  };
  const Component = props.render ?? TextInput;
  return (
    <Component
      {...composedProps}
      multiline
      onChange={undefined}
      onChangeText={props.onChange}
      onFocus={(e) => {
        setIsFocused(true);
        props.onFocus?.(e);
      }}
      onBlur={(e) => {
        setIsFocused(false);
        props.onBlur?.(e);
      }}
      readOnly={props.isDisabled || props.readOnly}
      style={composedStyles}
    />
  );
}
