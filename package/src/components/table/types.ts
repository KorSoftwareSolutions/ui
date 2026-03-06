import type { TableBodyProps } from "./table-body";
import type { TableCellProps } from "./table-cell";
import type { TableHeadProps } from "./table-head";
import type { TableHeaderProps } from "./table-header";
import type { TableRootProps } from "./table-root";
import type { TableRowProps } from "./table-row";

export type TableState = "default";

export interface TableStyles {
  root?: Partial<Record<TableState, TableRootProps["style"]>>;
  header?: Partial<Record<TableState, TableHeaderProps["style"]>>;
  body?: Partial<Record<TableState, TableBodyProps["style"]>>;
  row?: Partial<Record<TableState, TableRowProps["style"]>>;
  head?: Partial<Record<TableState, TableHeadProps["style"]>>;
  cell?: Partial<Record<TableState, TableCellProps["style"]>>;
}
