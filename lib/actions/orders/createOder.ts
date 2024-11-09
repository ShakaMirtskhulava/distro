"use server";

import { API_URL } from "@/lib/constants/constants";
import { getUserToken } from "../helpers/getUserToken";

export async function createOrder(orderItems: OrderCreationPayload) {
  const token = await getUserToken();

  try {
    const res = await fetch(`${API_URL}/v1/Order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(orderItems),
    });
    if (!res.ok) {
      const errorResponse = await res.json();
      return { status: res.status, message: errorResponse.Code };
    }

    return { status: res.status, message: res.statusText };
  } catch (error) {
    console.error(error);
    return { status: 500, message: "Internal Server Error" };
  }
}
