import PageAuthenticator from "@/components/auth/PageAuthenticator";
import OrdersWrapper from "@/components/orders/OrdersWrapper";
import PageLayoutComp from "@/components/ui/PageLayoutComp";
import { getUserRole } from "@/lib/actions/helpers/encodeUserCredentials";
import { getAllCompaniesOrders } from "@/lib/actions/orders/getAllCompaniesOrders";
import { DEFAULT_ORDER_COUNT } from "@/lib/constants/constants";

interface OrdersPageProps {
  searchParams: {
    page: string;
    type: string;
  };
}

export default async function OrdersPage({ searchParams }: OrdersPageProps) {
  const page = isNaN(parseInt(searchParams.page)) ? 1 : parseInt(searchParams.page);
  const type = isNaN(parseInt(searchParams.type)) ? 0 : parseInt(searchParams.type);
  const role = await getUserRole();
  const orders = await getAllCompaniesOrders(type, page, DEFAULT_ORDER_COUNT);

  return (
    <PageAuthenticator shouldAllow="admin" redirectTo="/dashboard/profile/my-company?orders=true">
      <PageLayoutComp title="Orders" description="All the orders are listed below.">
        <OrdersWrapper orders={orders?.data} role={role} page={page} />
      </PageLayoutComp>
    </PageAuthenticator>
  );
}
