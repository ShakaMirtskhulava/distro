import { useState } from "react";
import { cancelOrder } from "@/lib/actions/orders/cancelOrder";
import { apiResponseHandler } from "@/lib/utils/apiResponseHandler";
import { type Row, type Table } from "@tanstack/react-table";
import { OrderType } from "@/lib/constants/constants";
import Button from "../ui/Button";
import { Trash2Icon } from "lucide-react";
import Spinner from "../ui/Spinner";
import { useRouter } from "next/navigation";

interface SingleCompanyOrderCancellationButtonProps {
  table: Table<Order>;
  row: Row<Order>;
}

export default function SingleCompanyOrderCancellationButton({
  table,
  row,
}: SingleCompanyOrderCancellationButtonProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const orderId = table.getRow(row.id).getValue("id");
  const orderStatus = table.getRow(row.id).getValue("status");

  async function onOrderCancel(id: string) {
    setLoading(true);
    const res = await cancelOrder(id);
    await apiResponseHandler({
      res,
      options: { customErrors: { 200: "Successfully cancelled the order" } },
    });

    setLoading(false);
    router.refresh();
  }

  return (
    <div className="flex w-full items-center justify-center">
      <Button
        disabled={orderStatus !== OrderType.Pending}
        className={`flex h-7 w-24 items-center justify-center gap-1 bg-red-600 ${orderStatus !== OrderType.Pending && "cursor-not-allowed opacity-50"} px-2 text-xs font-medium text-white`}
        onClick={() => onOrderCancel(orderId as string)}
      >
        {!loading ? (
          <>
            <Trash2Icon size={15} className="mb-[1.5px] text-white" />
            Cancel
          </>
        ) : (
          <Spinner size={15} color="white" />
        )}
      </Button>
    </div>
  );
}
