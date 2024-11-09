import PageAuthenticator from "@/components/auth/PageAuthenticator";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Authorization",
  description: "Distribo Authorization Page",
};

interface AuthroizationLayoutProps {
  children: React.ReactNode;
}

export default function AuthorizationLayout({ children }: AuthroizationLayoutProps) {
  return <>{children}</>;
}
