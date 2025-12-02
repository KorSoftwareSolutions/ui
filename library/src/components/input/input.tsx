import React from "react";
import { InputVariants } from "./variants";
import { InputPrimitive, InputPrimitiveBaseProps } from "@/primitives";

interface InputProps extends InputPrimitiveBaseProps {
  variant?: keyof typeof InputVariants;
}

export function Input(props: InputProps) {
  const useVariantStyles = props.variant ? InputVariants[props.variant] : InputVariants["default"];
  const variantStyles = useVariantStyles();

  return <InputPrimitive {...props} styles={variantStyles} />;
}
