"use client";

import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import ProductThumbnail from "./ProductThumbnail";
import EditProductStockAction from "./EditProductStockAction";
import ProductActions from "./ProductActions";

interface ProductsWrapperProps {
  products: Product[] | null;
  role: string;
}

const columnHelper = createColumnHelper<Product>();

const columns = [
  columnHelper.accessor("id", {
    header: "ID",
    cell: (info) => info.getValue(),
    enableSorting: false,
    enableHiding: true,
    meta: { isVisible: false },
  }),
  columnHelper.accessor("images", {
    header: "Image",
    cell: (info) => <ProductThumbnail images={info.getValue()} />,
  }),
  columnHelper.accessor("name", {
    header: "Product Name",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("price", {
    header: "Price",
    cell: (info) => <span>₾ {info.getValue()}</span>,
  }),
  columnHelper.accessor("stock", {
    header: "Current Stock",
    cell: (info) => <EditProductStockAction stock={info.getValue()} productId={info.row.original.id} />,
  }),
];

export default function ProductsTable({ products, role }: ProductsWrapperProps) {
  const table = useReactTable({
    data: products as Product[],
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      columnVisibility: { id: false },
    },
  });

  return (
    <div className="mt-6 flex w-full items-center overflow-auto rounded-lg border md:overflow-visible">
      <table className="w-full">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="border-b text-left text-gray-500">
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="p-4 font-medium">
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
              <th className="px-10 py-2 text-center">Actions</th>
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="border-b hover:bg-gray-50">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="text-rigt max-w-28 truncate p-4">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
              <td className="max-w-28 truncate px-2 py-2">
                <ProductActions role={role} table={table} row={row} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
