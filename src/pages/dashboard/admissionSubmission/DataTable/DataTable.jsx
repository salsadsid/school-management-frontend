"use client";

import {
  ArrowDownIcon,
  ArrowUpIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@material-tailwind/react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { renames } from "../../../../configs/constOptions";

export function DataTable({
  columns,
  data,
  gFilter = true,
  cFilter = true,
  handleNext,
  handlePrevious,
}) {
  const [sorting, setSorting] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnFilters, setColumnFilters] = useState([]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      globalFilter,
      columnFilters,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });
  console.log(table.getHeaderGroups());
  return (
    <div className="mx-auto max-w-screen-2xl overflow-auto">
      <div className="mb-6 max-w-screen-2xl rounded-xl border border-gray-100 bg-white shadow-lg shadow-gray-100/50">
        {/* Global Filter */}
        {gFilter && (
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            <div className="relative w-full max-w-md">
              <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search all columns..."
                value={globalFilter}
                onChange={(e) => setGlobalFilter(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>
          </div>
        )}

        {/* Column Filters */}
        {cFilter && (
          <div className="px-2 py-3 border-b border-gray-100 bg-gray-50">
            <div className="flex items-center gap-4">
              {table.getHeaderGroups().map((headerGroup) =>
                headerGroup.headers
                  .filter((header, i) => i < 5)
                  .map((header) =>
                    header.column.getCanFilter() ? (
                      <div key={header.id} className="flex flex-col space-y-1">
                        <input
                          type="text"
                          placeholder={`${renames[header.column.id]}`}
                          value={header.column.getFilterValue() || ""}
                          onChange={(e) =>
                            header.column.setFilterValue(e.target.value)
                          }
                          className="px-3 py-1.5 text-sm rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        />
                      </div>
                    ) : null
                  )
              )}
            </div>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    const sortDirection = header.column.getIsSorted();
                    return (
                      <th
                        key={header.id}
                        className="group px-6 py-4 text-left font-semibold text-gray-700"
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        <div className="flex items-center space-x-2">
                          {!header.isPlaceholder &&
                            flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                          {sortDirection && (
                            <span className="text-sm">
                              {sortDirection === "asc" ? (
                                <ArrowUpIcon className="h-4 w-4" />
                              ) : (
                                <ArrowDownIcon className="h-4 w-4" />
                              )}
                            </span>
                          )}
                        </div>
                      </th>
                    );
                  })}
                </tr>
              ))}
            </thead>
            <tbody className="divide-y divide-gray-100">
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    className="transition-colors hover:bg-gray-50/50"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className="px-6 py-3.5 text-sm text-gray-600"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="px-6 py-24 text-center text-gray-400"
                  >
                    No records found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between px-6 py-4">
          <div className="text-sm text-gray-500">
            {table.getFilteredSelectedRowModel().rows.length} selected
          </div>
          <div className="flex items-center space-x-3">
            <Button
              variant="outlined"
              size="sm"
              onClick={handlePrevious}
              disabled={!handlePrevious}
              className="flex items-center space-x-2 rounded-lg border-gray-300 px-4 py-2 text-sm font-medium text-gray-600 shadow-sm hover:bg-gray-50 disabled:opacity-50"
            >
              Previous
            </Button>
            <Button
              size="sm"
              onClick={handleNext}
              disabled={!handleNext}
              className="flex items-center space-x-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 disabled:opacity-50"
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
