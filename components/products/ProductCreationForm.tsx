"use client";

import Button from "../ui/Button";
import TextInput from "../ui/TextInput";
import Spinner from "../ui/Spinner";
import TextArea from "../ui/TextArea";
import ImageUpload from "./ImageUpload";
import { useRef, useState } from "react";
import { createProductSchema } from "@/lib/schema/schema";
import { CreateProduct } from "@/types/schema-types";
import { createProduct } from "@/lib/actions/admin/products/createProduct";
import { apiResponseHandler } from "@/lib/utils/apiResponseHandler";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorMessage from "../ui/ErrorMessage";

export default function ProductCreationForm() {
  const [selectedImage, setSelectedImage] = useState<File[]>([]);
  const [imageError, setImageError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<CreateProduct>({
    resolver: zodResolver(createProductSchema),
  });
  const router = useRouter();

  async function onSubmit(productFormData: CreateProduct) {
    if (selectedImage.length === 0) {
      setImageError("Please upload at least one product image.");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("Name", productFormData.productName);
    formData.append("Description", productFormData.description);
    formData.append("Price", productFormData.price.toString());
    formData.append("Stock", productFormData.stock.toString());

    // Append selected images
    selectedImage.forEach((image) => {
      formData.append(`ImageFiles`, image);
    });

    try {
      const res = await createProduct(formData);
      const success = await apiResponseHandler({
        res,
        options: {
          customErrors: {
            200: "Successfully created the product",
            400: "Invalid Data",
            403: "You don't have permissions",
            409: "Company exists with that name already",
          },
        },
      });

      if (success) {
        setSelectedImage([]);
        router.push("/dashboard/products");
        router.refresh();
      }
    } catch (error) {
      console.error("Product creation failed:", error);
    } finally {
      setImageError(null);
      setLoading(false);
    }
  }

  return (
    <form
      className="flex flex-col gap-4 rounded-md p-6 text-sm shadow-lg sm:w-[24rem] md:w-[38rem] lg:w-[45rem] xs:w-full"
      ref={formRef}
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextInput
        label="Product Name"
        name="productName"
        placeholder="e.g avocado"
        register={register}
        error={errors.productName}
      />
      <TextArea
        label="Description"
        name="description"
        placeholder="Product description..."
        register={register}
        error={errors.description}
      />
      <TextInput
        label="Price (₾)"
        type="number"
        name="price"
        placeholder="e.g 12.00"
        register={register}
        error={errors.price}
      />
      <TextInput
        label="Stock (kg)"
        type="number"
        name="stock"
        placeholder="e.g 12.00"
        register={register}
        error={errors.stock}
      />
      <ImageUpload inputRef={inputRef} selectedImage={selectedImage} setSelectedImage={setSelectedImage} />
      {imageError && selectedImage.length === 0 && <ErrorMessage error={imageError} />}
      <div className="mt-4 flex w-full items-center justify-center">
        <Button type="submit" className="w-32 bg-secondary font-semibold text-white">
          {loading ? <Spinner color="white" size={20} /> : "Create"}
        </Button>
      </div>
    </form>
  );
}
