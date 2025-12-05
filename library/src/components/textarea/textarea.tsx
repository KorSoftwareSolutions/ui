import React from "react";
import { TextareaVariants } from "./variants";
import { TextareaPrimitive, TextareaPrimitiveBaseProps } from "@/primitives";

interface TextareaProps extends TextareaPrimitiveBaseProps {
  variant?: keyof typeof TextareaVariants;
}

export function Textarea(props: TextareaProps) {
  const useVariantStyles = TextareaVariants[props.variant ?? "default"];
  const variantStyles = useVariantStyles();

  return <TextareaPrimitive {...props} styles={variantStyles} />;
}
