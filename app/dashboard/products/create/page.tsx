import PageAuthenticator from "@/components/auth/PageAuthenticator";
import ProductCreationForm from "@/components/products/ProductCreationForm";

export default function ProductCreationPage() {
  return (
    <PageAuthenticator shouldAllow="admin" shouldNotAllowEmployee redirectTo="/dashboard/products">
      <div className="flex w-full flex-col items-center justify-center gap-14 px-4 py-5">
        <div className="flex w-full flex-col gap-1.5">
          <h1 className="text-2xl font-semibold">Create a new product</h1>
          <p className="text-sm text-gray-500">Fill in the form below to create a new product</p>
        </div>
        <ProductCreationForm />
      </div>
    </PageAuthenticator>
  );
}
