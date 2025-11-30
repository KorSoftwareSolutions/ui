import React from "react";
import { useField } from "./context";
import { FieldRootProps } from "./field-root";

interface FieldControlInjectedProps<TControlStyles> {
  value: FieldRootProps["value"];
  onChange: FieldRootProps["onChange"];

  onFocus?: () => void;
  onBlur?: () => void;

  styles?: TControlStyles;
}

export type FieldControlProps<T> = {
  render: (props: FieldControlInjectedProps<T>) => React.ReactElement;
};

export function FieldControl<T>(props: FieldControlProps<T>) {
  const { value, onChange, setFocused, state, styles } = useField<T>();

  const controlStyles = styles?.control;
  const composedStyles = controlStyles ? { ...controlStyles.default, ...controlStyles[state] } : undefined;

  const Component = props.render;
  return (
    <Component value={value} onChange={onChange} onBlur={() => setFocused(false)} onFocus={() => setFocused(true)} styles={composedStyles as T} />
  );
}
