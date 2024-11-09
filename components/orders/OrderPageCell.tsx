"use client";

import { UserRole } from "@/lib/constants/constants";
import { useRouter, useSearchParams } from "next/navigation";
import { usePathname } from "next/navigation";

interface OrderPageCellProps {
  cell: number;
  currentPage: number;
  role: string | null;
}

export default function OrderPageCell({ cell, currentPage, role }: OrderPageCellProps) {
  const searchParams = useSearchParams();
  const ordersParam = searchParams.get("orders");
  const typeParam = searchParams.has("type") ? searchParams.get("type") : 0;
  const pathname = usePathname();
  const router = useRouter();

  function handlePageChange() {
    if (role === UserRole.Admin || role === UserRole.Employee) {
      router.push(`${pathname}?type=${typeParam}&page=${cell}`);
    } else {
      router.push(`${pathname}?orders=true&type=${typeParam}&page=${cell}`);
    }
  }

  return (
    <button
      onClick={handlePageChange}
      className={`${cell === currentPage && "border-b-2 border-b-orange-600"} px-1.5 py-0.5 text-xs font-medium duration-200 ease-linear hover:scale-105`}
    >
      {cell}
    </button>
  );
}
