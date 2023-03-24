import { Selector, SortOrder, TableColumn } from "react-data-table-component";

export interface FileFormat {
  id: number;
  name: string;
}

export type handleSortType<T> = (
  selectedColumn: TableColumn<T>,
  sortDirection: SortOrder,
  sortedRows: T[]
) => void;
