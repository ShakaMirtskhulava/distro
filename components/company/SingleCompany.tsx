"use client";
import { BookUser, ArrowUpDown, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import SingleCompanyDetails from "./SingleCompanyDetails";
import Button from "../ui/Button";
import { UserRole } from "@/lib/constants/constants";

interface SingleCompanyProps extends Company {
  children: React.ReactNode;
  shouldShowOrdersTab: boolean;
  role: null | string;
}

export default function SingleCompany({ children, shouldShowOrdersTab, role, ...company }: SingleCompanyProps) {
  const router = useRouter();
  return (
    <>
      <section className="mt-4 flex w-full items-center justify-center gap-2">
        <button
          onClick={() => router.push("/dashboard/profile/my-company")}
          className={`flex items-center justify-center gap-1 rounded-md bg-gray-200/50 transition-opacity duration-200 ease-in-out ${!shouldShowOrdersTab ? "opacity-100" : "opacity-50"} px-4 py-2 shadow-sm`}
        >
          <BookUser size={15} />
          <span className="text-xs font-bold">Details</span>
        </button>
        <button
          onClick={() => router.push("/dashboard/profile/my-company?orders=true")}
          className={`flex items-center justify-center gap-1 rounded-md bg-gray-200/50 transition-opacity duration-200 ease-in-out ${shouldShowOrdersTab ? "opacity-100" : "opacity-50"} px-4 py-2 shadow-sm`}
        >
          <ArrowUpDown size={15} />
          <span className="text-xs font-bold">Orders</span>
        </button>
      </section>
      <div className="flex w-full justify-end px-4 py-2">
        {role === UserRole.RootUser && (
          <Button
            onClick={() => router.push("/dashboard/profile/my-company/create-user")}
            className="flex items-center justify-center gap-[5px] bg-secondary px-4 text-sm text-white"
          >
            <Plus size={17} color="white" />
            Create User
          </Button>
        )}
      </div>
      {shouldShowOrdersTab ? children : <SingleCompanyDetails {...company} />}
    </>
  );
}
