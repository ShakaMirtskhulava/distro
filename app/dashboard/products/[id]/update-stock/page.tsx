import PageAuthenticator from "@/components/auth/PageAuthenticator";
import UpdateProductStockForm from "@/components/products/stock/UpdateProductStockForm";
import PageLayoutComp from "@/components/ui/PageLayoutComp";
import { getProductById } from "@/lib/actions/products/getProductById";

interface UpdateProductStockPageProps {
  params: {
    id: string;
  };
}

export default async function UpdateProductStockPage({ params: { id } }: UpdateProductStockPageProps) {
  const product = await getProductById(id);
  const stock = product && product.data.stock;

  return (
    <PageAuthenticator shouldAllow="admin" redirectTo="/dashboard/products">
      <PageLayoutComp title="Update product stock" description="Fill in the form below to update a product stock.">
        <UpdateProductStockForm productId={id} stock={stock} />
      </PageLayoutComp>
    </PageAuthenticator>
  );
}
