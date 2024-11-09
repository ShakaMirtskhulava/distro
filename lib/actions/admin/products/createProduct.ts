"use server";

import { API_URL } from "@/lib/constants/constants";
import { getUserToken } from "../../helpers/getUserToken";

export async function createProduct(formData: FormData) {
  const token = await getUserToken();

  try {
    const res = await fetch(`${API_URL}/v1/Product`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    return { status: res.status, message: res.statusText };
  } catch (error) {
    console.error(error);
    return { status: 500, message: "Internal Server Error" };
  }
}
