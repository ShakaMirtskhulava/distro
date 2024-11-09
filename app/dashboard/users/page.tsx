import PageAuthenticator from "@/components/auth/PageAuthenticator";
import PageLayoutComp from "@/components/ui/PageLayoutComp";
import UserCreationNavigatorButton from "@/components/users/UserCreationNavigatorButton";

export default function UsersPage() {
  return (
    <PageAuthenticator shouldAllow="admin" redirectTo="/dashboard">
      <PageLayoutComp title="Users" description="All the users are listed below.">
        <UserCreationNavigatorButton />
      </PageLayoutComp>
    </PageAuthenticator>
  );
}
