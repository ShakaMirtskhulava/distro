import Link from "next/link";

export default function CompanyCard({ name }: Company) {
  return (
    <div className="lg mx-auto mt-6 max-w-sm overflow-hidden rounded-lg bg-white">
      <div className="flex w-full flex-col items-center">
        <div className="relative h-32 w-32 rounded-full border-2 border-gray-100">
          <div className="flex h-full w-full items-center justify-center rounded-full bg-green-600">
            <p className="text-xl font-bold">SC</p>
          </div>
        </div>
        <div className="mt-1 flex items-center justify-center">
          <span className="font-bold">{name}</span>
        </div>
        <Link className="mt-4 font-bold text-green-600" href={`/dashboard/profile/my-company`}>
          View Company
        </Link>
      </div>
    </div>
  );
}
