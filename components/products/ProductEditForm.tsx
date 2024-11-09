"use client";

import Image from "next/image";
import Button from "../ui/Button";
import Spinner from "../ui/Spinner";
import TextInput from "../ui/TextInput";
import TextArea from "../ui/TextArea";
import ErrorMessage from "../ui/ErrorMessage";
import toast from "react-hot-toast";
import { useState, useEffect, useRef } from "react";
import { editProduct } from "@/lib/actions/admin/products/editProduct";
import { apiResponseHandler } from "@/lib/utils/apiResponseHandler";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import { EditProduct } from "@/types/schema-types";
import { editProductSchema } from "@/lib/schema/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { imageFileBuilder } from "@/lib/utils/imageFileBuilder";

export default function ProductEditForm({ ...product }: Product) {
  const [imagesAsFiles, setImagesAsFiles] = useState<File[]>([]);
  const [imageError, setImageError] = useState<string | null>(null);
  const [imageURLs, setImageURLs] = useState<string[]>(() => product.images.map((image) => image.url));
  const [loading, setLoading] = useState(false);
  const injectEvent = new Event("injectEvent");
  const inputRef = useRef<HTMLInputElement>(null);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<EditProduct>({
    resolver: zodResolver(editProductSchema),
    defaultValues: {
      productName: product.name,
      description: product.description,
      price: product.price,
    },
  });

  const router = useRouter();

  // This function gets invoked on a custom event InjectImage, which is dispatched when the images are fetched from the server on the initial load
  // and it's also dispatched when the user uploads a new image.
  // This way, instead of using useEffect and running the method times the new image in the uploaded images, we can just dispatch the event and run the method once.
  async function onImageInjectionEvent() {
    const newFilesCollection = new DataTransfer();
    imagesAsFiles.forEach((file) => {
      newFilesCollection.items.add(file);
    });
    if (inputRef.current) {
      inputRef.current.files = newFilesCollection.files;
    }
  }

  async function fetchImagesOnLoad() {
    for (const image of product.images) {
      const file = await imageFileBuilder(image.url);
      if (file) {
        setImagesAsFiles((prev) => [...prev, file]);
      } else {
        toast.error(
          "Error occured while trying to build images, please don't update the product, otherwise some of the images will be lost",
        );
      }
    }
    window.dispatchEvent(injectEvent);
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files?.length || !e.target.files) {
      return;
    }

    const files = Array.from(e.target.files);
    for (const file of files) {
      const blobUrl = URL.createObjectURL(file);
      setImageURLs((prev) => [...prev, blobUrl]);
      setImagesAsFiles((prev) => [...prev, file]);
    }
  }

  useEffect(() => {
    window.addEventListener("injectEvent", onImageInjectionEvent);
    fetchImagesOnLoad();

    return () => {
      window.removeEventListener("injectEvent", onImageInjectionEvent);
    };
  }, []);

  async function handleImageRemoval(index: number) {
    setImageURLs((prev) => prev.filter((_, i) => i !== index));
    setImagesAsFiles((prev) => prev.filter((_, i) => i !== index));
  }

  async function onSubmit(updateFormData: EditProduct) {
    if (imagesAsFiles.length === 0) {
      setImageError("Please upload at least one product image.");
      return;
    }

    setLoading(true);

    // Merge the product ID into the form data
    const formData = new FormData();
    formData.append("Name", updateFormData.productName);
    formData.append("Description", updateFormData.description);
    formData.append("Price", updateFormData.price.toString());

    // Append the images
    imagesAsFiles.forEach((file) => {
      formData.append("ImageFiles", file);
    });

    const res = await editProduct(formData, product.id);

    const validate = await apiResponseHandler({
      res,
      options: { customErrors: { 200: "Successfully edited the product", 400: "Invalid Data" } },
    });

    if (validate) {
      router.push("/dashboard/products");
      router.refresh();
    }

    setImageError(null);
    setLoading(false);
  }

  return (
    <form
      className="mt-10 flex flex-col gap-4 rounded-md p-6 text-sm shadow-lg sm:w-[24rem] md:w-[38rem] lg:w-[45rem] xs:w-full"
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextInput
        name="productName"
        label="Name"
        placeholder="Enter the product name.."
        register={register}
        error={errors.productName}
      />
      <TextArea
        name="description"
        label="Description"
        className="h-24"
        resize="vertical"
        placeholder="Enter the product description.."
        register={register}
        error={errors.description}
      />
      <TextInput
        name="price"
        type="number"
        label="Price (₾)"
        placeholder="Enter the price.."
        register={register}
        error={errors.price}
      />
      <label htmlFor="ImageFiles" className="mt-3 w-full">
        <input
          type="file"
          ref={inputRef}
          accept="image/*"
          name="ImageFiles"
          multiple
          className="block w-full text-sm text-gray-500 text-transparent file:mr-4 file:cursor-pointer file:rounded-md file:border-0 file:bg-secondary file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white"
          onChange={handleImageUpload}
        />
      </label>
      {imageError && <ErrorMessage error={imageError} />}
      <div className="mt-3 flex w-full flex-wrap items-center gap-x-5">
        {imageURLs.map((image, index) => (
          <div key={image} className="relative h-20 w-20">
            <Image src={image} alt={image} fill />
            <div className="absolute right-1 top-1 rounded-lg">
              <button onClick={() => handleImageRemoval(index)} type="button" className="rounded-lg bg-black/60">
                <X size={17} className="text-white opacity-60 duration-200 ease-in-out hover:opacity-100" />
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex w-full items-center justify-center">
        <Button type="submit" className="w-32 bg-secondary font-semibold text-white">
          {loading ? <Spinner color="white" size={20} /> : "Update"}
        </Button>
      </div>
    </form>
  );
}
