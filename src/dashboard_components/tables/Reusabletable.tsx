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
}

export default function ReusableTable<T>({
  columns,
  data,
}: ReusableTableProps<T>) {
  return (
    <Table>
      {/* Header */}
      <TableHeader>
        <TableRow>
          {columns.map((col, i) => (
            <TableHead key={i} className={col.className}>
              {col.header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>

      {/* Body */}
      <TableBody>
        {data.map((row, rowIndex) => (
          <TableRow key={rowIndex} className="hover:bg-gray-50">
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
