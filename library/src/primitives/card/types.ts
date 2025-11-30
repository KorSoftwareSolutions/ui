import { CardRootProps } from "./card-root";
import { CardHeaderProps } from "./card-header";
import { CardTitleProps } from "./card-title";
import { CardBodyProps } from "./card-body";
import { CardFooterProps } from "./card-footer";

export type CardState = "default";

export interface CardStyles {
  root?: Partial<Record<CardState, CardRootProps["style"]>>;
  header?: Partial<Record<CardState, CardHeaderProps["style"]>>;
  title?: Partial<Record<CardState, CardTitleProps["style"]>>;
  body?: Partial<Record<CardState, CardBodyProps["style"]>>;
  footer?: Partial<Record<CardState, CardFooterProps["style"]>>;
}
