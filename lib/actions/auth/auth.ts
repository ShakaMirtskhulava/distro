"use server";

import { API_URL } from "@/lib/constants/constants";
import { LoginData } from "@/types/schema-types";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getUserToken } from "../helpers/getUserToken";
import { revalidateTag } from "next/cache";
import { encodeUserCredentials } from "../helpers/encodeUserCredentials";

// User login logic

export async function loginUser({ email, password }: LoginData) {
  if (!email || !password) {
    return { status: 400, message: "Please fill all fields." };
  }

  try {
    const res = await fetch(`${API_URL}/v1/User/Login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      const data = await res.json();
      cookies().set("user", data, {
        expires: new Date(Date.now() + 9 * 60 * 60 * 24 * 1000),
      });

      const doEncodedCredentialsExist = cookies().get("e_creds")?.value != null;

      if (!doEncodedCredentialsExist) {
        const userInfo = await getUserAuthStatus();
        userInfo.data && (await encodeUserCredentials(userInfo.data));
      }

      return { status: 200, message: "Logged in successfully." };
    }

    return res.ok
      ? { status: 200, message: "Successfully logged the user" }
      : { status: res.status, message: res.statusText };
  } catch (error) {
    console.error(error);
    return { status: 500, message: "Internal Server Error" };
  }
}

// User logout logic

export async function logoutUser() {
  cookies().delete("user");
  cookies().delete("e_creds");
  revalidateTag("auth");
  return redirect("/auth/login");
}

// Get User information

export async function getUserAuthStatus() {
  const token = await getUserToken();

  if (!token) {
    return { status: 400, message: "User is not authenticated", data: null };
  }

  try {
    const res = await fetch(`${API_URL}/v1/User/GetCurrentUser`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    return res.ok
      ? { status: 200, message: res.statusText, data: data as User }
      : { status: res.status, message: res.statusText };
  } catch (error) {
    return { status: 500, message: "Internal Server Error", data: null };
  }
}

// User Google autentication

export async function loginUserWithGoogle(code: string) {
  try {
    const res = await fetch(`${API_URL}/v1/User/google-redirect?code=${code}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    const data = await res.json();

    if (!data!.status) {
      // If status is not present in the response, it means that the user is authenticated
      cookies().set("user", data, {
        expires: new Date(Date.now() + 9 * 60 * 60 * 24 * 1000),
      });
    }
    return res.ok
      ? { status: 200, message: "Logged in successfully." }
      : { status: res.status, message: res.statusText };
  } catch (error) {
    return { status: 500, message: "Internal Server Error" };
  }
}

export async function confirmEmailAfterRegistration(token: string) {
  try {
    const res = await fetch(`${API_URL}/v1/User/RegistrationEmailConfirmation?token=${token}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    const data = await res.json();

    return res.ok
      ? { status: 200, message: "Confirmed email successfully", data }
      : { status: res.status, message: res.statusText, data: null };
  } catch (error) {
    console.error(error);
    return { status: 500, message: "Internal Server Error", data: null };
  }
}
