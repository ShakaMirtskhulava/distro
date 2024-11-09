import Button from "@/components/ui/Button";
import { UserRole } from "@/lib/constants/constants";
import Link from "next/link";

interface StockCardProps {
  product: Product;
  userRole: string | null;
}

export default function StockCard({ product, userRole }: StockCardProps) {
  return (
    <div className="rounded-lg border p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-semibold">Inventory Status</h2>
      <div className="space-y-4">
        <div className="flex flex-col items-start gap-4">
          <div className="mb-1 flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Current Stock</span>
            <span
              className={`ml-4 rounded-full px-4 py-2 ${
                product.stock > 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
              }`}
            >
              {product.stock > 0 ? `${product.stock} (kg) in stock` : "Out of stock"}
            </span>
          </div>
          {(userRole === UserRole.Employee || userRole === UserRole.Admin) && (
            <Link href={`/dashboard/products/${product.id}/stock-audits`}>
              <Button type="button" className="bg-secondary text-white">
                Stock Audits
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
