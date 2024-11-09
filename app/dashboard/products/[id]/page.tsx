import ProductDetails from "@/components/products/productDetails/ProductDetails";
import { getUserRole } from "@/lib/actions/helpers/encodeUserCredentials";
import { getProductById } from "@/lib/actions/products/getProductById";

interface ProductDetailsPageProps {
  params: {
    id: string;
  };
}

export default async function ProductDetailsPage({ params: { id } }: ProductDetailsPageProps) {
  const product = await getProductById(id);
  const userRole = await getUserRole();

  return <ProductDetails product={product.data} userRole={userRole} />;
}
