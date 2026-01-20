import { ProgressPrimitive } from "@/primitives";
import React from "react";
import { ProgressVariants } from "./variants";

interface ProgressProps {
  value?: number;
  max?: number;
  variant?: keyof typeof ProgressVariants;
  indicatorColor?: string;
}

export function Progress(props: ProgressProps) {
  const { value = 0, max = 100, variant = "default", indicatorColor } = props;

  const useVariantStyles = ProgressVariants[variant];
  const variantStyles = useVariantStyles();

  return (
    <ProgressPrimitive.Root value={value} max={max} styles={variantStyles}>
      <ProgressPrimitive.Indicator style={indicatorColor ? { backgroundColor: indicatorColor } : undefined} />
    </ProgressPrimitive.Root>
  );
}
