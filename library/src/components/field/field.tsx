import { FieldPrimitive } from "@/primitives";
import React from "react";
import { FieldVariants } from "./variants";

export interface FieldProps {
  children: React.ReactNode;
  id?: string;
  label?: string;
  description?: string;
  error?: string;

  variant?: keyof typeof FieldVariants;
}

export function Field(props: FieldProps) {
  const useVariantStyles = FieldVariants[props.variant || "default"];
  const variantStyles = useVariantStyles();

  return (
    <FieldPrimitive.Root styles={variantStyles}>
      {props.label && <FieldPrimitive.Label for={props.id}>{props.label}</FieldPrimitive.Label>}
      {props.description && <FieldPrimitive.Description>{props.description}</FieldPrimitive.Description>}
      {props.children}
      {props.error && <FieldPrimitive.Error>{props.error}</FieldPrimitive.Error>}
    </FieldPrimitive.Root>
  );
}
