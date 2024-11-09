"use client";
import Button from "@/components/ui/Button";
import TextInput from "@/components/ui/TextInput";
import { createCompanyFormSchema } from "@/lib/schema/schema";
import { CreateCompanyData } from "@/types/schema-types";
import { createCompany } from "@/lib/actions/company/createCompany";
import { useState } from "react";
import { apiResponseHandler } from "@/lib/utils/apiResponseHandler";
import { useRouter } from "next/navigation";
import Spinner from "../ui/Spinner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

export default function CompanyCreationForm() {
  const [loading, setLoading] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<CreateCompanyData>({
    resolver: zodResolver(createCompanyFormSchema),
  });
  const router = useRouter();

  async function onSubmit(companyFormData: CreateCompanyData) {
    setLoading(true);

    const { companyName, companyAddress, companyPhone, companyEmail } = companyFormData;
    const res = await createCompany({
      name: companyName,
      address: companyAddress,
      phone: companyPhone,
      email: companyEmail,
    });

    if (res?.code) {
      let text;
      switch (res.code) {
        case "NameIsTaken":
          text = "Company name is taken";
          break;
        case "EmailIsTaken":
          text = "Company email is taken";
          break;
        default:
          text = res.code;
          break;
      }

      toast.error(text);
    } else {
      const success = await apiResponseHandler({
        res,
      });

      if (success) {
        router.push("/dashboard/company");
      }
    }

    setLoading(false);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="m-auto flex flex-col gap-4 rounded-md p-6 text-sm shadow-lg sm:w-[24rem] md:w-[38rem] lg:w-[45rem] xs:w-full"
    >
      {/* <TextInput
        name="companyId"
        label="Company ID Number"
        value={companyFormData.companyId}
        onChange={handleChange}
        placeholder="e.g 101202303"
        className="pl-4 pr-2"
        error={errors.companyId}
      /> */}
      <TextInput
        name="companyName"
        label="Company Name"
        placeholder="e.g Company 1"
        className="pl-4 pr-2"
        register={register}
        error={errors.companyName}
      />
      <TextInput
        name="companyAddress"
        label="Address"
        placeholder="e.g street # 1"
        className="pl-4 pr-2"
        register={register}
        error={errors.companyAddress}
      />
      <TextInput
        name="companyPhone"
        label="Phone"
        placeholder="e.g +032 324 123"
        className="pl-4 pr-2"
        register={register}
        error={errors.companyPhone}
      />
      <TextInput
        name="companyEmail"
        label="Email"
        placeholder="e.g companymail@gmail.com"
        className="pl-4 pr-2"
        register={register}
        error={errors.companyEmail}
      />
      {/* <TextArea
        name="companyDescription"
        label="Description"
        value={companyFormData.companyDescription}
        onChange={handleChange}
        placeholder="e.g Apple"
        className="min-h-[6rem] overflow-auto pl-4 pr-2"
        error={errors.companyDescription}
      /> */}
      <div className="mt-1 flex w-full items-center justify-center">
        <Button type="submit" className="w-32 bg-secondary font-semibold text-white">
          {loading ? <Spinner size={20} color="white" /> : "Create"}
        </Button>
      </div>
    </form>
  );
}
