import type { CardBodyProps } from "./card-body";
import type { CardFooterProps } from "./card-footer";
import type { CardHeaderProps } from "./card-header";
import type { CardRootProps } from "./card-root";
import type { CardTitleProps } from "./card-title";

export type CardState = "default";

export interface CardStyles {
  root?: Partial<Record<CardState, CardRootProps["style"]>>;
  header?: Partial<Record<CardState, CardHeaderProps["style"]>>;
  title?: Partial<Record<CardState, CardTitleProps["style"]>>;
  body?: Partial<Record<CardState, CardBodyProps["style"]>>;
  footer?: Partial<Record<CardState, CardFooterProps["style"]>>;
}
