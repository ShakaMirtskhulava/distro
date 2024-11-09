import SingleCompany from "@/components/company/SingleCompany";
import SingleCompanyOrders from "@/components/orders/SingleCompanyOrders";
import { getCompany } from "@/lib/actions/company/getCompany";
import { getUserRole } from "@/lib/actions/helpers/encodeUserCredentials";
import Image from "next/image";
import { redirect } from "next/navigation";

interface MyCompanyPageProps {
  searchParams: {
    orders: string;
    type: string;
    page: string;
  };
}

export default async function MyCompanyPage({ searchParams }: MyCompanyPageProps) {
  const companyData = await getCompany();
  const company = companyData ? companyData.data : null;
  const isOrdersQueryEnabled = searchParams.orders === "true";
  const page = isNaN(parseInt(searchParams.page)) ? 1 : parseInt(searchParams.page);
  const type = isNaN(parseInt(searchParams.type)) ? 0 : parseInt(searchParams.type);
  const role = await getUserRole();

  if (!companyData.data) {
    return redirect("/dashboard/profile");
  }

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <div className="flex w-full flex-col items-center">
        <section className="flex items-center justify-center">
          <div className="border-green relative h-32 w-32 rounded-full border-2 border-black">
            <Image
              src={"https://placehold.co/600x400/000000/FFFFFF/png"}
              alt="company-profile-picture"
              fill
              className="rounded-full"
            />
          </div>
        </section>
        <SingleCompany role={role} shouldShowOrdersTab={isOrdersQueryEnabled} {...company}>
          <SingleCompanyOrders type={type} page={page} />
        </SingleCompany>
      </div>
    </div>
  );
}
