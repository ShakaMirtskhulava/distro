"use client";

import { useState } from "react";
import Button from "../../ui/Button";
import { loginFormSchema } from "@/lib/schema/schema";
import { LoginData } from "@/types/schema-types";
import TextInput from "../../ui/TextInput";
import { loginUser } from "@/lib/actions/auth/auth";
import { useRouter } from "next/navigation";
import GoogleAuthButton from "./GoogleAuthButton";
import { apiResponseHandler } from "@/lib/utils/apiResponseHandler";
import Spinner from "@/components/ui/Spinner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getUserRole } from "@/lib/actions/helpers/encodeUserCredentials";

export default function LoginForm() {
  const [loading, setLoading] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: zodResolver(loginFormSchema),
  });
  const router = useRouter();

  const onSubmit = async (loginFormData: LoginData) => {
    if (!loginFormData) return;
    setLoading(true);

    const { email, password } = loginFormData;
    const res = await loginUser({ email, password });
    const success = await apiResponseHandler({
      res,
      options: { customErrors: { 200: "Welcome back!", 404: "Invalid Credentials" } },
    });
    const role = await getUserRole();
    success && router.push("/dashboard/products");

    setLoading(false);
  };

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
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

      <div className="mb-5 flex items-start">
        <div className="flex h-5 items-center">
          <input id="remember" type="checkbox" value="" className="h-4 w-4 rounded border" />
        </div>
        <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-900">
          Remember me
        </label>
      </div>
      <div className="flex justify-between">
        <Button type="submit" className="h-10 w-full bg-secondary text-white">
          {loading ? (
            <div className="h-full w-full">
              <Spinner color="white" size={15} />
            </div>
          ) : (
            "Login"
          )}
        </Button>
      </div>
      <GoogleAuthButton />
    </form>
  );
}
