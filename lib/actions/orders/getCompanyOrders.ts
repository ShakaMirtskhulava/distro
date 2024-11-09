"use server";

import { API_URL, UserRole } from "@/lib/constants/constants";
import { getUserToken } from "../helpers/getUserToken";
import { getUserRole } from "../helpers/encodeUserCredentials";
import { revalidatePath } from "next/cache";

export async function getCompanyOrders(status: number, page: number, pageSize: number) {
  const token = await getUserToken();

  const role = await getUserRole();

  if (role === UserRole.Admin || role === UserRole.Employee) {
    return { status: 403, message: "Forbidden", data: null };
  }

  try {
    const res = await fetch(`${API_URL}/v1/Order/CompaniesByStatus/${status}/${page}?pageSize=${pageSize}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-cache",
    });
    const data: OrderPayload | null = await res.json();

    return res.ok
      ? { status: 200, message: "Successfully got the company orders", data: data }
      : { status: res.status, message: res.statusText, data: null };
  } catch (error) {
    console.error(error);
    return { status: 500, message: "Internal Server Error", data: null };
  }
}
