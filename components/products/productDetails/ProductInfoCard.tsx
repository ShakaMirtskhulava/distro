import { Leaf, Thermometer, TruckIcon } from "lucide-react";

export default function ProductInfoCard() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="flex items-center rounded-lg border p-4">
        <Leaf className="mr-3 h-6 w-6 text-green-500" />
        <div>
          <p className="text-sm text-gray-500">Freshness</p>
          <p className="font-medium">Harvested X days ago</p>
        </div>
      </div>
      <div className="flex items-center rounded-lg border p-4">
        <Thermometer className="mr-3 h-6 w-6 text-blue-500" />
        <div>
          <p className="text-sm text-gray-500">Storage</p>
          <p className="font-medium">X°C - Y°C (X°F - Y°F)</p>
        </div>
      </div>
      <div className="flex items-center rounded-lg border p-4">
        <TruckIcon className="mr-3 h-6 w-6 text-purple-500" />
        <div>
          <p className="text-sm text-gray-500">Origin</p>
          <p className="font-medium">Local Farm, Georgia</p>
        </div>
      </div>
    </div>
  );
}
