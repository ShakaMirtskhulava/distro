import PageAuthenticator from "@/components/auth/PageAuthenticator";
import CompanyUserCreationForm from "@/components/profile/CompanyUserCreationForm";

export default function page() {
  return (
    <PageAuthenticator shouldNotAllowStaff shouldNotAllowBaseUser redirectTo="/dashboard/profile" shouldAllow="all">
      <div className="flex items-center justify-center">
        <CompanyUserCreationForm />
      </div>
    </PageAuthenticator>
  );
}
