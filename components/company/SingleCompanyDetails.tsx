import { IdCard, Building2, MapPinHouse, Phone, Mail } from "lucide-react";

export default function SingleCompanyDetails({ ...company }: Company) {
  return (
    <div className="w-full space-y-4 rounded-lg p-4">
      <div className="flex items-center gap-3 text-xs">
        <IdCard size={20} />
        <span className="">{company.id}</span>
      </div>
      <div className="flex items-center gap-3 text-xs">
        <Building2 size={20} />
        <span className="">{company.name}</span>
      </div>
      <div className="flex items-center gap-3 text-xs">
        <MapPinHouse size={20} />
        <span className="">{company.address}</span>
      </div>
      <div className="flex items-center gap-3 text-xs">
        <Phone size={20} />
        <span className="">{company.phone}</span>
      </div>
      <div className="flex items-center gap-3 text-xs">
        <Mail size={20} />
        <span className="">{company.email}</span>
      </div>
    </div>
  );
}
