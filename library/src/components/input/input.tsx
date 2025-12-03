import React from "react";
import { InputVariants } from "./variants";
import { InputPrimitive, InputPrimitiveBaseProps } from "@/primitives";

interface InputProps extends InputPrimitiveBaseProps {
  variant?: keyof typeof InputVariants;
}

export function Input(props: InputProps) {
  const useVariantStyles = InputVariants[props.variant ?? "default"];
  const variantStyles = useVariantStyles();

  return <InputPrimitive {...props} styles={variantStyles} />;
}
