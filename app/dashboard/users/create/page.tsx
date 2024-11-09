import PageAuthenticator from "@/components/auth/PageAuthenticator";
import PageLayoutComp from "@/components/ui/PageLayoutComp";
import UserCreationForm from "@/components/users/UserCreationForm";

export default function UserCreationPage() {
  return (
    <PageAuthenticator shouldNotAllowEmployee shouldAllow="admin" redirectTo="/dashboard">
      <PageLayoutComp title="Create a new user" description="Fill in the form below to create a new user">
        <UserCreationForm />
      </PageLayoutComp>
    </PageAuthenticator>
  );
}
