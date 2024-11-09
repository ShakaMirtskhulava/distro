"use client";

import { ChevronDownIcon } from "lucide-react";
import { Portal, Select } from "@ark-ui/react";
import { useSearchParams } from "next/navigation";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

export default function OrdersTypeSelector() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const ordersParam = searchParams.get("orders");
  const selectItems = ["Pending", "Rejected", "Approved"];

  function handleTypeChange(index: number) {
    if (ordersParam) {
      router.push(`${pathname}?orders=true&type=${index}&page=1`);
    } else {
      router.push(`${pathname}?type=${index}&page=1`);
    }
  }

  return (
    <Select.Root items={selectItems} className="flex flex-col gap-2 text-xs" positioning={{ placement: "bottom" }}>
      <Select.Label className="text-right text-[.6rem] font-bold uppercase">Order Type</Select.Label>
      <Select.Control className="flex h-8 w-28 items-center justify-center rounded-md bg-tertiary">
        <Select.Trigger className="flex items-center justify-center">
          <Select.ValueText placeholder="Select Type" className="font-medium" />
          <Select.Indicator>
            <ChevronDownIcon size={17} />
          </Select.Indicator>
        </Select.Trigger>
      </Select.Control>
      <Portal>
        <Select.Positioner className="mt-1 w-28 rounded-md bg-tertiary text-xs shadow-sm">
          <Select.Content>
            <Select.ItemGroup className="">
              {selectItems.map((item, index) => (
                <Select.Item
                  key={item}
                  item={item}
                  onClick={() => handleTypeChange(index)}
                  className="cursor-pointer rounded-md py-3 text-center text-[.7rem] font-bold uppercase hover:bg-gray-100"
                >
                  <Select.ItemText>
                    {item === "Pending" ? "⏳ Pending" : item === "Approved" ? "✅ Approved" : "❌ Rejected"}
                  </Select.ItemText>
                </Select.Item>
              ))}
            </Select.ItemGroup>
          </Select.Content>
        </Select.Positioner>
      </Portal>
      <Select.HiddenSelect />
    </Select.Root>
  );
}
