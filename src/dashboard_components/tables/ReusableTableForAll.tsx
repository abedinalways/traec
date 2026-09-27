"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";

export interface Column<T> {
  header: string;
  accessor?: keyof T;
  render?: (row: T, index?: number) => React.ReactNode; // index optional
  className?: string;
}

export interface ReusableTableProps<T> {
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
    <Table className="w-full">
      <TableHeader>
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
                  ? col.render(row, rowIndex)
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
