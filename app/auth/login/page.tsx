import AuthLayout from "@/components/auth/AuthLayout";
import LoginForm from "@/components/auth/login/LoginForm";
import PageAuthenticator from "@/components/auth/PageAuthenticator";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description: "Authentication form",
};

export default function LoginPage() {
  return (
    <PageAuthenticator shouldAllow="unauthorized" redirectTo="/dashboard">
      <AuthLayout>
        <div className="flex h-full items-center p-4 lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">Login an account</h1>
              <p className="text-muted-foreground text-sm">Enter your email and password below to login your account</p>
            </div>
            <LoginForm />
          </div>
        </div>
      </AuthLayout>
    </PageAuthenticator>
  );
}
