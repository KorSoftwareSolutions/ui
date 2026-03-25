import type { ItemRootProps } from "./item-root";
import type { ItemMediaProps } from "./item-media";
import type { ItemContentProps } from "./item-content";
import type { ItemTitleProps } from "./item-title";
import type { ItemDescriptionProps } from "./item-description";
import type { ItemActionsProps } from "./item-actions";

export type ItemState = "default";

export interface ItemStyles {
  root?: Partial<Record<ItemState, ItemRootProps["style"]>>;
  media?: Partial<Record<ItemState, ItemMediaProps["style"]>>;
  mediaIcon?: Partial<Record<ItemState, ItemMediaProps["style"]>>;
  content?: Partial<Record<ItemState, ItemContentProps["style"]>>;
  title?: Partial<Record<ItemState, ItemTitleProps["style"]>>;
  description?: Partial<Record<ItemState, ItemDescriptionProps["style"]>>;
  actions?: Partial<Record<ItemState, ItemActionsProps["style"]>>;
}
