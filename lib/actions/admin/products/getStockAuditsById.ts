"use server";

import { API_URL } from "@/lib/constants/constants";
import { getUserToken } from "../../helpers/getUserToken";

export async function getStockAuditsById(id: string) {
  const token = await getUserToken();

  try {
    const res = await fetch(`${API_URL}/v1/Product/StockChanges/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-cache",
    });

    const data = await res.json();

    return res.ok
      ? { status: 200, message: "Successfully fetched the stock audits", data: data }
      : { status: res.status, message: res.statusText, data: null };
  } catch (error) {
    console.error(error);
    return { status: 500, message: "Internal Server Error", data: null };
  }
}
