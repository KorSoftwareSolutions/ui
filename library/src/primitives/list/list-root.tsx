import React from "react";

export interface ListProps<T> {
  data: readonly T[];
  keyExtractor: (item: T, index: number) => string;
  renderItem: (info: { item: T; index: number }) => React.ReactElement;
  renderEmpty?: () => React.ReactElement;
  renderSeparator?: () => React.ReactElement;
}

export const ListRoot = <T,>(props: ListProps<T>) => {
  return (
    <>
      {props.data.length === 0 && props.renderEmpty?.()}
      {props.data.map((item, index) => (
        <React.Fragment key={props.keyExtractor(item, index) ?? index}>
          {props.renderItem({ item, index })}
          {props.data.length - 1 !== index && props.renderSeparator?.()}
        </React.Fragment>
      ))}
    </>
  );
};
