import React from "react";
import { useField } from "./field-context";

interface FieldControlInjectedProps {
  value?: string;
  onChange?: (value: string) => void;
}

export interface FieldControlProps {
  render: (props: FieldControlInjectedProps) => React.ReactElement;
}

export function FieldControl(props: FieldControlProps) {
  const { value, onChange } = useField();
  const Component = props.render;
  return <Component value={value} onChange={onChange} />;
}
