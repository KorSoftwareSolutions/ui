import type { DescriptionListRootProps } from "./description-list-root";
import type { DescriptionListItemProps } from "./description-list-item";
import type { DescriptionListTermProps } from "./description-list-term";
import type { DescriptionListDetailsProps } from "./description-list-details";
import type { DescriptionListActionsProps } from "./description-list-actions";

export type DescriptionListState = "default";

export interface DescriptionListStyles {
  root?: Partial<Record<DescriptionListState, DescriptionListRootProps["style"]>>;
  item?: Partial<Record<DescriptionListState, DescriptionListItemProps["style"]>>;
  term?: Partial<Record<DescriptionListState, DescriptionListTermProps["style"]>>;
  details?: Partial<Record<DescriptionListState, DescriptionListDetailsProps["style"]>>;
  actions?: Partial<Record<DescriptionListState, DescriptionListActionsProps["style"]>>;
}
