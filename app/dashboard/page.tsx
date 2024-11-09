import PageAuthenticator from "@/components/auth/PageAuthenticator";
import { getUserAuthStatus } from "@/lib/actions/auth/auth";

export default async function DashboardPage() {
  const userData = await getUserAuthStatus();
  const userMail = userData?.data?.email.split("@")[0];
  return (
    <PageAuthenticator shouldAllow="all" redirectTo="/auth/login">
      <div className="p-6 px-12">
        <h1 className="text-3xl font-bold">Hi {userMail}, welcome back 👋</h1>
      </div>
    </PageAuthenticator>
  );
}
