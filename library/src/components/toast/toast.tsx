import { ToastPrimitive } from "@/primitives";
import React from "react";
import { ToastVariants } from "./variants";

interface ToastProps {
  title: string;
  description?: string;

  variant?: keyof typeof ToastVariants;
}

export function ToastComponent(props: ToastProps) {
  const useVariantStyles = ToastVariants[props.variant || "default"];
  const styles = useVariantStyles();

  return (
    <ToastPrimitive.Root styles={styles}>
      <ToastPrimitive.Title>{props.title}</ToastPrimitive.Title>
      {!!props.description && <ToastPrimitive.Description>{props.description}</ToastPrimitive.Description>}
    </ToastPrimitive.Root>
  );
}
