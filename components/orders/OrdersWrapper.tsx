import OrdersTable from "./OrdersTable";
import OrdersTypeSelector from "./OrdersTypeSelector";
import OrderPageCell from "./OrderPageCell";
import { MinusCircle } from "lucide-react";
import { redirect } from "next/navigation";
import { UserRole } from "@/lib/constants/constants";

interface OrdersWrapperProps {
  orders: OrderPayload | null;
  page: number;
  role: string | null;
}

export default async function OrdersWrapper({ orders, role, page }: OrdersWrapperProps) {
  const pageCount = orders?.totalCount && Math.ceil(orders?.totalCount / 10);

  if (orders) {
    if (orders.totalCount > 0 && orders.orders.length === 0) {
      if (role === UserRole.Admin || role === UserRole.Employee) {
        return redirect("/dashboard");
      } else {
        return redirect("/dashboard/profile/my-company");
      }
    }
  }

  return (
    <div className="m-auto mb-10 mt-8 flex w-full flex-col items-end gap-4 px-4 md:w-[59rem]">
      <OrdersTypeSelector />
      {orders ? (
        <>
          {orders.orders.length > 0 ? (
            <OrdersTable orders={orders.orders} role={role} />
          ) : (
            <div className="mt-5 flex w-full flex-col items-center justify-center gap-4 font-light uppercase tracking-wider text-gray-500">
              <MinusCircle size={60} className="text-gray-500 opacity-50" />
              No Orders Found
            </div>
          )}
          <div className="flex w-full flex-wrap items-center justify-center gap-2 gap-y-4 px-4">
            {orders.totalCount < 10 && orders.totalCount !== 0 ? (
              <OrderPageCell cell={1} currentPage={page} role={role} />
            ) : (
              Array(pageCount)
                .fill(0)
                .map((_, idx) => <OrderPageCell key={idx} role={role} cell={idx + 1} currentPage={page} />)
            )}
          </div>
        </>
      ) : (
        <div className="flex w-full items-center justify-center font-light uppercase tracking-wider text-gray-500">
          There are no available orders.
        </div>
      )}
    </div>
  );
}
