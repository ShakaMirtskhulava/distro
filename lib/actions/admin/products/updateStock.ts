"use server";

import { API_URL } from "@/lib/constants/constants";
import { getUserToken } from "../../helpers/getUserToken";

export async function updateStock(formData: FormData, id: string) {
  const token = await getUserToken();

  try {
    const res = await fetch(`${API_URL}/v1/Product/Stock/${id}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    return res.ok
      ? { status: 200, message: "Stock updated successfully" }
      : { status: 400, message: "Failed to update stock" };
  } catch (error) {
    console.error(error);
    return { status: 500, message: "Internal server error" };
  }
}