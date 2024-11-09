import PageAuthenticator from "@/components/auth/PageAuthenticator";
import PageLayoutComp from "@/components/ui/PageLayoutComp";

export default async function CompanyPage() {
  return (
    <PageAuthenticator shouldAllow="admin" redirectTo="/dashboard">
      <PageLayoutComp title="Companies" description="All the created companies are listed below."></PageLayoutComp>
    </PageAuthenticator>
  );
}
