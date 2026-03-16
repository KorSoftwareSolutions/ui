import React from "react";
import { useCombobox } from "../context";

export interface ComboboxListProps<T> {
  keyExtractor?: (item: T, index: number) => string;
  renderItem: (info: { item: T; index: number }) => React.ReactElement;
  renderEmpty?: () => React.ReactElement;
  renderSeparator?: () => React.ReactElement;
}

export function ComboboxList<T>(props: ComboboxListProps<T>) {
  const combobox = useCombobox();
  const items = combobox.filteredItems as T[];

  const keyExtractor =
    props.keyExtractor ?? ((item: T, index: number) => combobox.getItemValue(item) ?? String(index));

  if (items.length === 0) {
    return <>{props.renderEmpty?.()}</>;
  }

  return (
    <>
      {items.map((item, index) => (
        <React.Fragment key={keyExtractor(item, index)}>
          {props.renderItem({ item, index })}
          {index < items.length - 1 && props.renderSeparator?.()}
        </React.Fragment>
      ))}
    </>
  );
}
