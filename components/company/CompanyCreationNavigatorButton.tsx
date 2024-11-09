"use client";

import { useRouter } from "next/navigation";
import Button from "../ui/Button";
import { Plus } from "lucide-react";

export default function CompanyCreationNavigatorButton() {
  const router = useRouter();

  function redirectToCreationForm() {
    router.push("/dashboard/company/create");
  }

  return (
    <div className="flex w-full justify-end">
      <Button
        className="flex items-center justify-center gap-[5px] bg-secondary px-4 text-sm text-white"
        onClick={redirectToCreationForm}
      >
        <Plus size={15} color="white" />
        Create a Company
      </Button>
    </div>
  );
}
