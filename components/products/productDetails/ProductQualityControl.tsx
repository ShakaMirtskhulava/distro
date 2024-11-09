import { Leaf, Scale, Thermometer } from "lucide-react";

export default function ProductQualityControl() {
  return (
    <div className="rounded-lg border p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-semibold">Quality Control</h2>
      <div className="space-y-2">
        <div className="flex items-center">
          <Scale className="mr-2 h-5 w-5 text-green-500" />
          <p>
            <strong>Average Weight:</strong> X-Y kg per head
          </p>
        </div>
        <div className="flex items-center">
          <Leaf className="mr-2 h-5 w-5 text-green-500" />
          <p>
            <strong>Color:</strong> X
          </p>
        </div>
        <div className="flex items-center">
          <Thermometer className="mr-2 h-5 w-5 text-green-500" />
          <p>
            <strong>Temperature Monitored:</strong> From farm to delivery
          </p>
        </div>
      </div>
    </div>
  );
}
