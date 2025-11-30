import React from "react";
import { Card as CardPrimitive, CardStyles } from "../primitives/card";

export interface CompositeCardProps {
  title?: string;
  footer?: React.ReactNode;
  children: React.ReactNode;
  styles?: CardStyles;
}

export function Card({ title, footer, children, styles }: CompositeCardProps) {
  return (
    <CardPrimitive.Root styles={styles}>
      {title && (
        <CardPrimitive.Header>
          <CardPrimitive.Title>{title}</CardPrimitive.Title>
        </CardPrimitive.Header>
      )}
      <CardPrimitive.Body>{children}</CardPrimitive.Body>
      {footer && <CardPrimitive.Footer>{footer}</CardPrimitive.Footer>}
    </CardPrimitive.Root>
  );
}
