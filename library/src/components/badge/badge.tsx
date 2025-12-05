import { BadgePrimitive } from "@/primitives";
import React from "react";
import { BadgeVariants } from "./variants";

interface BadgeProps {
  children: string;
  variant?: keyof typeof BadgeVariants;
  color?: string;
}

export function Badge(props: BadgeProps) {
  const useVariantStyles = BadgeVariants[props.variant || "default"];
  const styles = useVariantStyles();

  // Override background color if custom color is provided
  const customStyle = props.color ? { backgroundColor: props.color } : undefined;

  return (
    <BadgePrimitive.Root styles={styles} style={customStyle}>
      <BadgePrimitive.Label>{props.children}</BadgePrimitive.Label>
    </BadgePrimitive.Root>
  );
}
