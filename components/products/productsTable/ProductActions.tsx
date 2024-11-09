import { deleteProduct } from "@/lib/actions/admin/products/deleteProduct";
import { apiResponseHandler } from "@/lib/utils/apiResponseHandler";
import { Edit, Trash, Eye } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ConfirmationModal from "../../ui/ConfirmationModal";
import { type Row, type Table } from "@tanstack/react-table";
import { UserRole } from "@/lib/constants/constants";

interface AdminProductActionsProps {
  role: string;
  table: Table<Product>;
  row: Row<Product>;
}

export default function ProductActions({ table, row, role }: AdminProductActionsProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const productId = table.getRow(row.id).getValue("id");

  function handleView() {
    router.push(`/dashboard/products/${productId}`);
  }

  function handleEdit() {
    router.push(`/dashboard/products/edit/${productId}`);
  }

  function handleOpenModal() {
    setIsModalOpen(true);
  }

  async function handleDelete() {
    const res = await deleteProduct(productId as string);
    await apiResponseHandler({ res, options: { customErrors: { 200: "Successfully deleted the product" } } });
    setIsModalOpen(false);
  }
  return (
    <div className="flex items-center justify-center gap-2 rounded-lg px-2 py-1">
      <button
        onClick={handleView}
        className="border-1 rounded-md border border-gray-200 p-3 text-black duration-200 ease-in-out hover:bg-gray-100"
      >
        <Eye size={20} />
      </button>
      {role === UserRole.Admin && (
        <>
          <button
            onClick={handleEdit}
            className="border-1 rounded-md border border-gray-200 p-3 text-black duration-200 ease-in-out hover:bg-gray-100"
          >
            <Edit size={20} />
          </button>
          <button
            onClick={handleOpenModal}
            className="rounded-md bg-red-500 p-3 text-white duration-200 ease-in-out hover:bg-red-600"
          >
            <Trash size={20} />
          </button>
        </>
      )}
      <ConfirmationModal callback={handleDelete} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </div>
  );
}
