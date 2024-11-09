import PageAuthenticator from "@/components/auth/PageAuthenticator";
import ProductEditForm from "@/components/products/ProductEditForm";
import PageLayoutComp from "@/components/ui/PageLayoutComp";
import { API_URL } from "@/lib/constants/constants";

interface IndividualProductEditPageProps {
  params: {
    id: string;
  };
}

async function getSingleProduct(id: string) {
  try {
    const res = await fetch(`${API_URL}/v1/Product/${id}`, {
      method: "GET",
      cache: "no-cache",
    });
    const data = await res.json();

    return res.ok
      ? { status: 200, message: "Successfully fetched the product", data: data as Product }
      : { status: res.status, message: res.statusText, data: null };
  } catch (error) {
    console.error(error);
    return { status: 500, message: "Internal Server Error", data: null };
    [];
  }
}

export default async function IndividualProductEditPage({ params }: IndividualProductEditPageProps) {
  const product = await getSingleProduct(params.id);
  const { data } = product;

  return (
    <PageAuthenticator shouldAllow="admin" redirectTo="/dashboard/products">
      {data && (
        <main className="flex w-full flex-col items-center py-4">
          <PageLayoutComp title="Edit Product" description="Edit a product on this page"></PageLayoutComp>
          <ProductEditForm {...data} />
        </main>
      )}
    </PageAuthenticator>
  );
}
