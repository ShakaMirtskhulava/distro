"use client";

import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import Button from "../ui/Button";

export default function UserCreationNavigatorButton() {
  const router = useRouter();

  function navigateToUserCreation() {
    router.push("/dashboard/users/create");
  }

  return (
    <div className="flex w-full justify-end">
      <Button
        onClick={navigateToUserCreation}
        className="flex items-center justify-center gap-[5px] bg-secondary px-4 text-sm text-white"
      >
        <Plus size={17} color="white" />
        Create User
      </Button>
    </div>
  );
}
