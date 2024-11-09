interface ProductPriceProps {
  price: number;
}

export default function ProductPrice({ price }: ProductPriceProps) {
  return (
    <div className="rounded-lg border p-6 shadow-sm">
      <div className="space-y-4">
        <div>
          <p className="mb-1 text-sm font-medium text-gray-700">Unit Price</p>
          <p className="text-2xl font-bold">₾ {price.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}
