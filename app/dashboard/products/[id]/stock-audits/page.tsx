import StockAuditsTable from "@/components/products/stock/StockAuditsTable";
import PageLayoutComp from "@/components/ui/PageLayoutComp";
import { getStockAuditsById } from "@/lib/actions/admin/products/getStockAuditsById";

interface StockAuditsPageProps {
  params: {
    id: string;
  };
}

export default async function StockAuditsPage({ params: { id } }: StockAuditsPageProps) {
  const stockAudits = await getStockAuditsById(id);

  return (
    <PageLayoutComp title="Stock Audits" description="All the stock audits are listed below.">
      <StockAuditsTable stockAudits={stockAudits.data} />
    </PageLayoutComp>
  );
}
