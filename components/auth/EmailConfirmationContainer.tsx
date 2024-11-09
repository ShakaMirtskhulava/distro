"use client";

import { confirmEmailAfterRegistration, logoutUser } from "@/lib/actions/auth/auth";
import Spinner from "../ui/Spinner";
import { useEffect, useState } from "react";

interface EmailConfirmationContainerProps {
  token: string;
}

export default function EmailConfirmationContainer({ token }: EmailConfirmationContainerProps) {
  const [status, setStatus] = useState<"" | "confirmed" | "notConfirmed">("");

  async function confirmEmail() {
    const res = await confirmEmailAfterRegistration(token);
    if (res.status === 200) {
      setStatus("confirmed");
    } else {
      setStatus("notConfirmed");
    }
    setTimeout(() => {
      logoutUser();
    }, 5000);
  }

  useEffect(() => {
    confirmEmail();
  }, []);

  return (
    <>
      {status === "confirmed" && (
        <div>
          <h1 className="mb-4 text-2xl font-bold text-green-600">Email Confirmed!</h1>
          <p className="text-secondary">
            Your email has been successfully confirmed. You will be redirected to the login page in 5 seconds.
          </p>
        </div>
      )}
      {status === "notConfirmed" && (
        <div>
          <h1 className="mb-4 text-2xl font-bold text-red-600">Email didn't confirm!</h1>
          <p className="text-secondary">
            Your email could not be confirmed. Please contact the administrator for assistance.
          </p>
        </div>
      )}
      {status === "" && (
        <div>
          <Spinner color="black" size={20} />
          <h1 className="my-4 text-2xl font-bold text-black">Verifying your email...</h1>
          <p className="text-secondary">Please wait while we verify your email address.</p>
        </div>
      )}
    </>
  );
}
