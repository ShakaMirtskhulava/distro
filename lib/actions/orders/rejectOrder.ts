"use server";

import { API_URL } from "@/lib/constants/constants";
import { getUserToken } from "../helpers/getUserToken";

export async function rejectOrder(id: string) {
  const token = await getUserToken();

  try {
    const res = await fetch(`${API_URL}/v1/Order/Reject?id=${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.ok
      ? { status: 200, message: "The company order is rejected" }
      : { status: res.status, message: res.statusText };
  } catch (error) {
    console.error(error);
    return { status: 500, message: "Internal Server Error" };
  }
}
