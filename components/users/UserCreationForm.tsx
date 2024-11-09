"use client";

import Button from "../ui/Button";
import TextInput from "../ui/TextInput";
import Spinner from "../ui/Spinner";
import { useState } from "react";
import { createUserSchema } from "@/lib/schema/schema";
import { CreateUser } from "@/types/schema-types";
import { createUser } from "@/lib/actions/admin/users/createUser";
import { apiResponseHandler } from "@/lib/utils/apiResponseHandler";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export default function UserCreationForm() {
  const [loading, setLoading] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<CreateUser>({
    resolver: zodResolver(createUserSchema),
  });

  async function onSubmit(userFormData: CreateUser) {
    setLoading(true);

    const res = await createUser(userFormData);
    const success = await apiResponseHandler({
      res,
      options: { customErrors: { 200: "Successfully created the user", 400: "Email is taken" } },
    });

    // Clear form fields by calling reset()
    if (success) reset();

    setLoading(false);
  }

  return (
    <form
      className="m-auto flex flex-col gap-4 rounded-md p-6 text-sm shadow-lg sm:w-[24rem] md:w-[38rem] lg:w-[45rem] xs:w-full"
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextInput
        label="Email Address"
        name="email"
        placeholder="e.g johndoe30@gmail.com"
        register={register}
        error={errors.email}
      />
      <TextInput
        label="Password"
        type="password"
        name="password"
        placeholder="e.g Something123$!@"
        register={register}
        error={errors.password}
      />
      <TextInput
        label="Confirm Password"
        type="password"
        name="confirmPassword"
        placeholder="e.g Something123$!@"
        register={register}
        error={errors.confirmPassword}
      />
      <div className="flex w-full flex-col gap-1">
        <label htmlFor="role" className="text-sm font-bold text-gray-700">
          Role
        </label>
        <select
          {...register("role")}
          className="w-full rounded-md border border-gray-300 p-2 text-sm focus:outline-none focus:ring focus:ring-blue-500"
        >
          <option value="RootUser">Root User</option>
          <option value="User">User</option>
          <option value="Employee">Employee</option>
        </select>
      </div>
      <div className="mt-4 flex w-full items-center justify-center">
        <Button type="submit" className="w-32 bg-secondary font-semibold text-white">
          {loading ? <Spinner color="white" size={20} /> : "Create"}
        </Button>
      </div>
    </form>
  );
}
