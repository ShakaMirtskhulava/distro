"use server";

import { API_URL, UserRole } from "@/lib/constants/constants";
import { getUserToken } from "../helpers/getUserToken";
import { getUserRole } from "../helpers/encodeUserCredentials";

export async function getCompany() {
  const token = await getUserToken();

  const role = await getUserRole();

  if (role === UserRole.Admin || role === UserRole.Employee) {
    return { status: 403, message: "Forbidden", data: null };
  }

  try {
    const res = await fetch(`${API_URL}/v1/Company`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-cache",
    });

    const data = await res.json();

    return res.ok
      ? { status: 200, message: "Successfully fetched the companies", data }
      : { status: res.status, message: res.statusText, data: null };
  } catch (error) {
    console.error(error);
    return { status: 500, message: "Internal Server Error", data: null };
  }
}
