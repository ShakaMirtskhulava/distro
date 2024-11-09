import PageAuthenticator from "@/components/auth/PageAuthenticator";
import Header from "@/components/dashboard/Header";
import Sidebar from "@/components/dashboard/SideBar";
import { getUserAuthStatus } from "@/lib/actions/auth/auth";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Basic dashboard",
};

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const userData = await getUserAuthStatus();
  const userMail = userData?.data?.email.slice(0, 2).toUpperCase();

  return (
    <div className="flex">
      <Sidebar />
      <main className="w-full flex-1 overflow-hidden pt-2 md:px-4">
        <Header userMail={userMail} />
        <hr />
        {children}
      </main>
    </div>
  );
}
