import { createContext, useContext } from "react";
import type { TableState, TableStyles } from "./types";

export interface TableContext {
  state: TableState;
  styles?: TableStyles;
}

export const TableContext = createContext<TableContext | undefined>(undefined);

export const useTable = () => {
  const context = useContext(TableContext);
  if (!context) {
    throw new Error("useTable must be used within a Table.Root");
  }
  return context;
};
