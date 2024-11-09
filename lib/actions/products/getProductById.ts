import { API_URL } from "@/lib/constants/constants";

export async function getProductById(productId: string) {
    try {
      const res = await fetch(`${API_URL}/v1/Product/${productId}`, { cache: "no-cache" });
  
      const data = await res.json();
  
      return res.ok
        ? { status: 200, message: "Successfully fetched the product", data: data }
        : { status: res.status, message: res.statusText, data: null };
    } catch (error) {
      console.error(error);
      return { status: 500, message: "Internal Server Error", data: null };
    }
  }