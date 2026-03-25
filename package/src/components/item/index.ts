import { ItemActions } from "./item-actions";
import { ItemContent } from "./item-content";
import { ItemDescription } from "./item-description";
import { ItemMedia } from "./item-media";
import { ItemRoot } from "./item-root";
import { ItemTitle } from "./item-title";

export const Item = {
  Root: ItemRoot,
  Media: ItemMedia,
  Content: ItemContent,
  Title: ItemTitle,
  Description: ItemDescription,
  Actions: ItemActions,
};

export type { ItemRootProps } from "./item-root";
export type { ItemMediaProps } from "./item-media";
export type { ItemContentProps } from "./item-content";
export type { ItemTitleProps } from "./item-title";
export type { ItemDescriptionProps } from "./item-description";
export type { ItemActionsProps } from "./item-actions";
export type { ItemStyles } from "./types";
