import { getUserRole } from "@/lib/actions/helpers/encodeUserCredentials";
import { UserRole } from "@/lib/constants/constants";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useLayoutEffect, useState } from "react";

interface EditProductStockActionProps {
  stock: number;
  productId: string;
}

export default function EditProductStockAction({ stock, productId }: EditProductStockActionProps) {
  const [role, setRole] = useState<null | string>();
  const router = useRouter();

  function navigateOnProductStockUpdatePage() {
    router.push(`/dashboard/products/${productId}/update-stock`);
  }

  async function getRole() {
    const res = await getUserRole();
    setRole(res);
  }

  useLayoutEffect(() => {
    getRole();
  }, []);

  return (
    <div className="flex w-36 items-center justify-between px-4">
      <span>kg {stock}</span>
      {(role === UserRole.Admin || role === UserRole.Employee) && (
        <button
          onClick={navigateOnProductStockUpdatePage}
          className="cursor-pointer rounded-md p-3 text-black duration-200 ease-in-out hover:bg-gray-100"
        >
          <Pencil size={20} />
        </button>
      )}
    </div>
  );
}
