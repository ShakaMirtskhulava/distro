"use server";

import { API_URL } from "@/lib/constants/constants";
import { getUserToken } from "../../helpers/getUserToken";

export async function editProduct(formData: FormData, id: string) {
  const token = await getUserToken();

  try {
    const res = await fetch(`${API_URL}/v1/Product/${id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    return res.ok
      ? { status: 200, message: "Product updated successfully" }
      : { status: 400, message: "Failed to update product" };
  } catch (error) {
    console.error(error);
    return { status: 500, message: "Internal server error" };
  }
}
