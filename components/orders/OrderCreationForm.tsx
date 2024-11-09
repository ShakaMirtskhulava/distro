"use client";

import React, { useState } from "react";
import TextInput from "../ui/TextInput";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateOrder } from "@/types/schema-types";
import { createOrderSchema } from "@/lib/schema/schema";
import Button from "../ui/Button";
import Spinner from "../ui/Spinner";
import { apiResponseHandler } from "@/lib/utils/apiResponseHandler";
import { useRouter } from "next/navigation";
import DatePickerComp from "../ui/DatePickerComp";
import { createOrder } from "@/lib/actions/orders/createOder";
import { DollarSign } from "lucide-react";

interface OrderCreationFormProps {
  product: Product;
}

export default function OrderCreationForm({ product }: OrderCreationFormProps) {
  const [loading, setLoading] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
    watch,
  } = useForm<CreateOrder>({
    resolver: zodResolver(createOrderSchema),
  });
  const router = useRouter();
  const orderQuantity = watch().quantity;

  async function onSubmit(orderData: CreateOrder) {
    setLoading(true);
    const { deliveryDateDeadline, quantity } = orderData;

    const res = await createOrder({
      deliveryDateDeadline,
      items: [
        {
          productId: product.id,
          quantity,
        },
      ],
    });

    await apiResponseHandler({
      res,
      options: {
        customErrors: {
          200: "Order completed!",
          400:
            res.message === "NotEnoughStock"
              ? "There is not enough stock"
              : res.message === "UserHasNotCompany"
                ? "User has not company"
                : "Bad request",
        },
      },
    });

    setLoading(false);
    if (res.status === 200) {
      router.push("/dashboard/products");
      router.refresh();
    }
  }

  return (
    <form className="flex w-full flex-col gap-4 text-sm" onSubmit={handleSubmit(onSubmit)}>
      <div className="rounded-lg border p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold">Order Management</h2>
        <Controller
          control={control}
          name="deliveryDateDeadline"
          render={({ field }) => (
            <DatePickerComp
              setDeadlineDate={(date) => field.onChange(date?.toISOString() || "")}
              errorMessage={errors.deliveryDateDeadline || null}
            />
          )}
        />
        <TextInput
          label="Quantity (kg)"
          type="number"
          name="quantity"
          placeholder="e.g 10"
          register={register}
          error={errors.quantity}
        />
        <div className="my-4 space-y-4">
          <div>
            <p className="mb-1 text-sm font-medium text-gray-700">Unit Price</p>
            <p className="text-2xl font-bold">₾ {product.price.toFixed(2)}</p>
          </div>
          <div>
            <p className="mb-1 text-sm font-medium text-gray-700">Total Price</p>
            <p className="text-2xl font-bold">₾ {orderQuantity > 0 ? (orderQuantity * product.price).toFixed(2) : 0}</p>
          </div>
        </div>
        <Button
          type="submit"
          className="flex w-full items-center justify-center bg-secondary p-3 font-medium text-white"
        >
          {loading ? <Spinner color="white" size={20} /> : <span>Place Order</span>}
        </Button>
      </div>
    </form>
  );
}
