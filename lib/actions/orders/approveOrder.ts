"use server";

import { API_URL } from "@/lib/constants/constants";
import { getUserToken } from "../helpers/getUserToken";

export async function approveOrder(id: string) {
  const token = await getUserToken();

  try {
    const res = await fetch(`${API_URL}/v1/Order/Approve?id=${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const errorResponse = await res.json();

    return res.ok
      ? { status: 200, message: "The company order is approved" }
      : { status: res.status, message: errorResponse.Code };
  } catch (error) {
    console.error(error);
    return { status: 500, message: "Internal Server Error" };
  }
}
