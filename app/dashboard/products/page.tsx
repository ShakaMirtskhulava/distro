import PageLayoutComp from "@/components/ui/PageLayoutComp";
import ProductCreationNavigatorButton from "@/components/products/ProductCreationNavigatorButton";
import { getAllProducts } from "@/lib/actions/products/getProducts";
import { getUserRole } from "@/lib/actions/helpers/encodeUserCredentials";
import { UserRole } from "@/lib/constants/constants";
import ProductsTable from "@/components/products/productsTable/ProductsTable";

export default async function ProductsPage() {
  const data = await getAllProducts();
  const products = data ? data.data : null;
  const role = await getUserRole();
  const isAdmin = role === UserRole.Admin || role === UserRole.Employee;

  return (
    <PageLayoutComp title="Products" description="All the products are listed below.">
      {isAdmin && <ProductCreationNavigatorButton />}
      <ProductsTable products={products} role={role!} />
    </PageLayoutComp>
  );
}
