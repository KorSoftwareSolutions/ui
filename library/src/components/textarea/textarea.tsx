import { TextareaPrimitive, type TextareaPrimitiveBaseProps } from "@/primitives";
import React from "react";
import { TextareaVariants } from "./variants";

export interface TextareaProps extends TextareaPrimitiveBaseProps {
  variant?: keyof typeof TextareaVariants;
}

export function Textarea(props: TextareaProps) {
  const useVariantStyles = TextareaVariants[props.variant ?? "default"];
  const variantStyles = useVariantStyles();

  return <TextareaPrimitive {...props} styles={variantStyles} />;
}
