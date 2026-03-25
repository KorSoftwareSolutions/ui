import { DescriptionListActions } from "./description-list-actions";
import { DescriptionListDetails } from "./description-list-details";
import { DescriptionListItem } from "./description-list-item";
import { DescriptionListRoot } from "./description-list-root";
import { DescriptionListTerm } from "./description-list-term";

export const DescriptionList = {
  Root: DescriptionListRoot,
  Item: DescriptionListItem,
  Term: DescriptionListTerm,
  Details: DescriptionListDetails,
  Actions: DescriptionListActions,
};

export type { DescriptionListRootProps } from "./description-list-root";
export type { DescriptionListItemProps } from "./description-list-item";
export type { DescriptionListTermProps } from "./description-list-term";
export type { DescriptionListDetailsProps } from "./description-list-details";
export type { DescriptionListActionsProps } from "./description-list-actions";
export type { DescriptionListStyles } from "./types";
