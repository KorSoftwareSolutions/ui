import { EmptyPrimitive } from "@/primitives";
import React from "react";
import { EmptyVariants } from "./variants";

export interface EmptyProps {
  children?: React.ReactNode;
  media?: React.ReactNode;
  title: string;
  description?: string;

  variant?: keyof typeof EmptyVariants;
}

export function Empty(props: EmptyProps) {
  const useVariantStyles = EmptyVariants[props.variant || "default"];
  const styles = useVariantStyles();

  return (
    <EmptyPrimitive.Root styles={styles}>
      {!!props.media && <EmptyPrimitive.Media>{props.media}</EmptyPrimitive.Media>}
      <EmptyPrimitive.Title>{props.title}</EmptyPrimitive.Title>
      {props.description && <EmptyPrimitive.Description>{props.description}</EmptyPrimitive.Description>}
      {props.children}
    </EmptyPrimitive.Root>
  );
}
