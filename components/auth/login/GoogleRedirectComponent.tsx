"use client";

import { loginUserWithGoogle } from "@/lib/actions/auth/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface GoogleRedirectComponentProps {
  code: string;
}

export default function GoogleRedirectComponent({ code }: GoogleRedirectComponentProps) {
  const router = useRouter();
  const googleAuthenticateHandler = async () => {
    await loginUserWithGoogle(code);
    router.push("/dashboard");
  };

  useEffect(() => {
    googleAuthenticateHandler();
  }, []);

  return null;
}
