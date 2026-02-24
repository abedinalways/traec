"use client";

import { ReactNode } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from "../ui/table";

type RowRenderer<T> = (item: T, index: number) => ReactNode;

type ReusableTableProps<T> = {
    tableHeader: string[];
    items: T[];
    rowRenderers: RowRenderer<T>[];

    minTableWidthPx?: number;
    wrapperClassName?: string;
    headerCellClassName?: string;
    bodyCellClassName?: string;
    getRowKey?: (item: T, index: number) => string | number;

    isLoading?: boolean;
    emptyText?: string;
    onRowClick?: (item: T) => void;
};


export default function ReusableTable<T>({
    tableHeader,
    items,
    rowRenderers,
    minTableWidthPx = 1102,
    wrapperClassName = "",
    headerCellClassName =
    "px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400",
    bodyCellClassName =
    "px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400",
    getRowKey = (_, i) => i,
    isLoading = false,
    emptyText = "No data found",
    onRowClick, // ✅
}: ReusableTableProps<T>) {
    const colCount = tableHeader.length;

    const emptyRenderer: RowRenderer<T> = () => null;

    const safeRenderers: RowRenderer<T>[] =
        rowRenderers.length >= colCount
            ? rowRenderers.slice(0, colCount)
            : [
                ...rowRenderers,
                ...Array(colCount - rowRenderers.length).fill(emptyRenderer),
            ];

    return (
        <div
            className={`overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03] ${wrapperClassName}`}
        >
            <div className="max-w-full overflow-x-auto">
                <div style={{ minWidth: minTableWidthPx }}>
                    <Table>
                        {/* Header */}
                        <TableHeader className="border-b  leading-3 border-gray-100 dark:bg-[#0b151d] dark:border-white/[0.05]">
                            <TableRow>
                                {tableHeader.map((h, idx) => (
                                    <TableCell
                                        key={idx}
                                        isHeader
                                        className={headerCellClassName}
                                    >
                                        {h}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHeader>

                        {/* Body */}
                        <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">   
                            {isLoading ? (
                                <TableRow>
                                    <TableCell colSpan={colCount} className="px-5 py-6">
                                        Loading...
                                    </TableCell>
                                </TableRow>
                            ) : items.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={colCount} className="px-5 py-6">
                                        {emptyText}
                                    </TableCell>
                                </TableRow>
                            ) : (
                                items.map((item, index) => {
                                    const isClickable = Boolean(onRowClick);

                                    return (
                                        <TableRow
                                            key={getRowKey(item, index)}
                                            onClick={isClickable ? () => onRowClick!(item) : undefined}
                                            className={
                                                isClickable
                                                    ? "cursor-pointer hover:bg-gray-50 dark:hover:bg-white/[0.03]"
                                                    : ""
                                            }
                                        >
                                            {safeRenderers.map((render, colIndex) => (
                                                <TableCell
                                                    key={colIndex}
                                                    className={bodyCellClassName}
                                                >
                                                    {render(item, index)}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    );
                                })
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    );
}

