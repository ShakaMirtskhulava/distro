import { getCompanyOrders } from "@/lib/actions/orders/getCompanyOrders";
import OrdersWrapper from "./OrdersWrapper";
import { getUserRole } from "@/lib/actions/helpers/encodeUserCredentials";
import { DEFAULT_ORDER_COUNT } from "@/lib/constants/constants";

interface SingleCompanyOrdersProps {
  page: number;
  type: number;
}

export default async function SingleCompanyOrders({ type, page }: SingleCompanyOrdersProps) {
  const orders = await getCompanyOrders(type, page, DEFAULT_ORDER_COUNT);
  const role = await getUserRole();

  return <OrdersWrapper orders={orders.data} role={role} page={page} />;
}
