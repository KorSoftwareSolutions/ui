import { CardRootProps } from "./card-root";
import { CardHeaderProps } from "./card-header";
import { CardTitleProps } from "./card-title";
import { CardContentProps } from "./card-content";
import { CardFooterProps } from "./card-footer";

export type CardState = "default";

export interface CardStyles {
  root?: Partial<Record<CardState, CardRootProps["style"]>>;
  header?: Partial<Record<CardState, CardHeaderProps["style"]>>;
  title?: Partial<Record<CardState, CardTitleProps["style"]>>;
  content?: Partial<Record<CardState, CardContentProps["style"]>>;
  footer?: Partial<Record<CardState, CardFooterProps["style"]>>;
}
