"use server";

import { API_URL } from "@/lib/constants/constants";
import { getUserToken } from "../helpers/getUserToken";

export async function cancelOrder(id: string) {
  const token = await getUserToken();

  try {
    const res = await fetch(`${API_URL}/v1/Order?id=${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.ok
      ? { status: 200, message: "Successfully got the company orders" }
      : { status: res.status, message: res.statusText };
  } catch (error) {
    console.error(error);
    return { status: 500, message: "Internal Server Error" };
  }
}
