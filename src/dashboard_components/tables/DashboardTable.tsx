"use client";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ReactNode } from "react";

interface Column {
  header: string;
  className?: string;
}

interface DashboardTableProps<T> {
  columns: Column[];
  data: T[];
  renderRow: (item: T, index: number) => ReactNode;
}

export default function DashboardTable<T>({
  columns,
  data,
  renderRow,
}: DashboardTableProps<T>) {
  return (
    <div className="border border-gray-200 overflow-hidden bg-white">
      <Table>
        <TableHeader className="bg-gray-100">
          <TableRow className="hover:bg-gray-100">
            {columns.map((col, index) => (
              <TableHead
                key={index}
                className={`text-gray-600 font-medium text-[16px] ${col.className}`}
              >
                {col.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((item, index) => renderRow(item, index))}
        </TableBody>
      </Table>
    </div>
  );
}
