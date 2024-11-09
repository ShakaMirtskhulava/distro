import PageAuthenticator from "@/components/auth/PageAuthenticator";
import CompanyCreationForm from "@/components/company/CompanyCreationForm";
import PageLayoutComp from "@/components/ui/PageLayoutComp";

export default function CompanyCreationPage() {
  return (
    <PageAuthenticator shouldAllow="all" shouldNotAllowEmployee shouldNotAllowBaseUser redirectTo="/dashboard/company">
      <PageLayoutComp title="Create a new company" description="Fill in the form below to create a new company">
        <CompanyCreationForm />
      </PageLayoutComp>
    </PageAuthenticator>
  );
}
