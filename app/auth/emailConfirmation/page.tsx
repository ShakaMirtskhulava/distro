import EmailConfirmationContainer from "@/components/auth/EmailConfirmationContainer";
import { redirect } from "next/navigation";

interface EmailConfirmationPageProps {
  searchParams: {
    [key: string]: string;
  };
}
export default function EmailConfirmationPage({ searchParams }: EmailConfirmationPageProps) {
  const token = searchParams?.token;

  if (!token) {
    return redirect("/login");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-tertiary">
      <div className="max-w-md rounded-lg bg-white p-8 text-center shadow-lg">
        <EmailConfirmationContainer token={token} />
      </div>
    </div>
  );
}
