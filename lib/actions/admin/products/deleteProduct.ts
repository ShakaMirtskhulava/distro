"use server";

import { API_URL } from "@/lib/constants/constants";
import { getUserToken } from "../../helpers/getUserToken";
import { revalidatePath } from "next/cache";

export async function deleteProduct(productId: string) {
  revalidatePath("/dashboard/products");
  const token = await getUserToken();

  try {
    const res = await fetch(`${API_URL}/v1/Product/${productId}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-cache",
    });

    return res.ok
      ? { status: 200, message: "Product deleted successfully" }
      : { status: 400, message: "Failed to delete product" };
  } catch (error) {
    console.error(error);
    return { status: 500, message: "Internal server error" };
  }
}
