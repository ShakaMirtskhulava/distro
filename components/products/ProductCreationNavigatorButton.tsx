"use client";

import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import Button from "../ui/Button";

export default function ProductCreationNavigatorButton() {
  const router = useRouter();

  function navigateToProductCreation() {
    router.push("/dashboard/products/create");
  }

  return (
    <div className="flex w-full justify-end">
      <Button
        onClick={navigateToProductCreation}
        className="flex items-center justify-center gap-[5px] bg-secondary px-4 text-sm text-white"
      >
        <Plus size={17} color="white" />
        Create Product
      </Button>
    </div>
  );
}
