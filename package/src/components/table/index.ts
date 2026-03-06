import { TableBody } from "./table-body";
import { TableCell } from "./table-cell";
import { TableHead } from "./table-head";
import { TableHeader } from "./table-header";
import { TableRoot } from "./table-root";
import { TableRow } from "./table-row";

export const Table = {
  Root: TableRoot,
  Header: TableHeader,
  Body: TableBody,
  Row: TableRow,
  Head: TableHead,
  Cell: TableCell,
};

export type { TableBodyProps } from "./table-body";
export type { TableCellProps } from "./table-cell";
export type { TableHeadProps } from "./table-head";
export type { TableHeaderProps } from "./table-header";
export type { TableRootProps } from "./table-root";
export type { TableRowProps } from "./table-row";
export type { TableStyles } from "./types";
