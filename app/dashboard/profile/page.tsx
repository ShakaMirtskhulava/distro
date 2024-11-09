import CompanyCreationNavigatorButton from "@/components/company/CompanyCreationNavigatorButton";
import Profile from "@/components/profile/Profile";
import PageLayoutComp from "@/components/ui/PageLayoutComp";
import { getUserAuthStatus } from "@/lib/actions/auth/auth";
import { getCompany } from "@/lib/actions/company/getCompany";
import { getUserRole } from "@/lib/actions/helpers/encodeUserCredentials";
import { UserRole } from "@/lib/constants/constants";

export default async function ProfilePage() {
  const userData = await getUserAuthStatus();
  const userEmail = userData.data?.email;
  const userRole = await getUserRole();
  const companiesData = await getCompany();
  const company: Company | null = companiesData ? companiesData.data : null;
  const isAdmin = userRole === UserRole.Admin || userRole === UserRole.Employee;
  const isRootUser = userRole === UserRole.RootUser;

  return (
    <PageLayoutComp title="Profile" description="Update your profile information.">
      {!company && !isAdmin && isRootUser && <CompanyCreationNavigatorButton />}
      {userRole && userEmail !== undefined && <Profile userEmail={userEmail} userRole={userRole} company={company} />}
    </PageLayoutComp>
  );
}
