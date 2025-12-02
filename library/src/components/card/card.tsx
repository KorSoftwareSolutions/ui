import { CardPrimitive } from "@/primitives";
import React from "react";
import { CardVariants } from "./variants";

interface CardProps {
  title?: string;
  children: React.ReactNode;

  variant?: keyof typeof CardVariants;
}

export function Card(props: CardProps) {
  const useVariantStyles = CardVariants[props.variant || "default"];
  const styles = useVariantStyles();

  return (
    <CardPrimitive.Root styles={styles}>
      {!!props.title && (
        <CardPrimitive.Header>
          <CardPrimitive.Title>{props.title}</CardPrimitive.Title>
        </CardPrimitive.Header>
      )}
      <CardPrimitive.Body>{props.children}</CardPrimitive.Body>
    </CardPrimitive.Root>
  );
}
