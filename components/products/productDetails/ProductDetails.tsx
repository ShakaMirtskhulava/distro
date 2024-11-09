"use client";

import ProductImagesCarousel from "./ProductImagesCarousel";
import ProductQualityControl from "./ProductQualityControl";
import ProductInfoCard from "./ProductInfoCard";
import OrderCreationForm from "@/components/orders/OrderCreationForm";
import { UserRole } from "@/lib/constants/constants";
import ProductPrice from "./ProductPrice";
import StockCard from "./StockCard";

interface ProductDetailsProps {
  product: Product;
  userRole: string | null;
}

export default function ProductDetails({ product, userRole }: ProductDetailsProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-8 md:grid-cols-3">
        <div className="space-y-6 md:col-span-2">
          <h1 className="text-3xl font-bold text-gray-900 lg:text-4xl">{product.name}</h1>
          <ProductImagesCarousel images={product.images} />
          <ProductInfoCard />
          <div>
            <h2 className="mb-2 text-xl font-semibold">Product Description</h2>
            <p className="text-gray-600">{product.description}</p>
          </div>
        </div>
        <div className="space-y-6">
          {userRole === UserRole.User || userRole === UserRole.RootUser ? (
            <OrderCreationForm product={product} />
          ) : (
            <ProductPrice price={product.price} />
          )}
          <StockCard product={product} userRole={userRole}/>
          <ProductQualityControl />
        </div>
      </div>
    </div>
  );
}
