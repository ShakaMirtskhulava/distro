"use client";

import Button from "@/components/ui/Button";
import ErrorMessage from "@/components/ui/ErrorMessage";
import Spinner from "@/components/ui/Spinner";
import TextArea from "@/components/ui/TextArea";
import TextInput from "@/components/ui/TextInput";
import { updateStock } from "@/lib/actions/admin/products/updateStock";
import { updateProductStockSchema } from "@/lib/schema/schema";
import { apiResponseHandler } from "@/lib/utils/apiResponseHandler";
import { UpdateProductStock } from "@/types/schema-types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface UpdateProductStockFormProps {
  productId: string;
  stock: number;
}

export default function UpdateProductStockForm({ productId, stock }: UpdateProductStockFormProps) {
  const [loading, setLoading] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
    setError,
  } = useForm<UpdateProductStock>({
    resolver: zodResolver(updateProductStockSchema),
  });
  const router = useRouter();

  const { selectedDescription } = watch();

  async function onSubmit(data: UpdateProductStock) {
    if (data.selectedDescription === "writeOff" && data.quantity > stock) {
      setError("quantity", {
        type: "manual",
        message: "Not enough stock available",
      });
      return;
    }

    const formData = new FormData();
    if (data.selectedDescription) {
      if (data.selectedDescription === "receive") {
        formData.append("Description", data.selectedDescription);
        formData.append("NewStock", (data.quantity + stock).toString());
      } else if (data.selectedDescription === "writeOff") {
        formData.append("Description", data.selectedDescription);
        formData.append("NewStock", (stock - data.quantity).toString());
      } else if (data.selectedDescription === "other" && data.description) {
        formData.append("Description", data.description);
        formData.append("NewStock", data.quantity.toString());
      }
    }
    setLoading(true);
    const res = await updateStock(formData, productId);
    await apiResponseHandler({
      res,
      options: {
        customErrors: {
          200: res.message,
          400: res.message,
        },
      },
    });
    setLoading(false);
    if (res.status === 200) {
      router.push(`/dashboard/products`);
      router.refresh();
    }
  }

  return (
    <form
      className="m-auto flex flex-col gap-4 rounded-md p-6 text-sm shadow-lg sm:w-[24rem] md:w-[38rem] lg:w-[45rem] xs:w-full"
      onSubmit={handleSubmit(onSubmit)}
    >
      <label className="flex flex-col gap-2">
        Pick an update description
        <select {...register("selectedDescription")} className="w-32 rounded-md border p-2">
          <option value="receive">Receive</option>
          <option value="writeOff">Write-off</option>
          <option value="other">Other</option>
        </select>
        {errors.selectedDescription && <ErrorMessage error={errors.selectedDescription} />}
      </label>
      {selectedDescription === "other" && (
        <TextArea
          placeholder="Describe your reason of stock update..."
          name="description"
          register={register}
          error={errors.description}
          className="h-20"
        />
      )}
      <TextInput
        label="Quantity (kg)"
        type="number"
        name="quantity"
        placeholder="e.g 10"
        register={register}
        error={errors.quantity}
      />
      <div className="mt-4 flex w-full items-center justify-center">
        <Button type="submit" className="w-32 bg-secondary font-semibold text-white">
          {loading ? <Spinner color="white" size={20} /> : "Create"}
        </Button>
      </div>
    </form>
  );
}
