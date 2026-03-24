"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Column<T> {
  header: string;
  accessor?: keyof T;
  render?: (row: T) => React.ReactNode;
  className?: string;
}

interface ReusableTableProps<T> {
  columns: Column<T>[];
  data: T[];
  rowKey?: (row: T, index: number) => string | number;
}

export default function ReusableTableForAll<T>({
  columns,
  data,
  rowKey,
}: ReusableTableProps<T>) {
  return (
    <Table>
      <TableHeader className="">
        <TableRow>
          {columns.map((col, i) => (
            <TableHead key={i} className={col.className}>
              {col.header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>

      <TableBody>
        {data.map((row, rowIndex) => (
          <TableRow
            key={rowKey ? rowKey(row, rowIndex) : rowIndex}
            className="hover:bg-gray-50"
          >
            {columns.map((col, colIndex) => (
              <TableCell key={colIndex} className={col.className}>
                {col.render
                  ? col.render(row)
                  : col.accessor
                    ? (row[col.accessor] as React.ReactNode)
                    : null}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
