import React from "react";
import { List } from "../../list";
import { useCombobox } from "../context";

export interface ComboboxListProps<T> {
  keyExtractor: (item: T, index: number) => string;
  renderItem: (info: { item: T; index: number }) => React.ReactElement;
  renderEmpty?: () => React.ReactElement;
  renderSeparator?: () => React.ReactElement;
}

export function ComboboxList<T>(props: ComboboxListProps<T>) {
  const combobox = useCombobox();

  return (
    <List
      data={combobox.items as T[]}
      keyExtractor={props.keyExtractor}
      renderItem={props.renderItem}
      renderEmpty={props.renderEmpty}
      renderSeparator={props.renderSeparator}
    />
  );
}
