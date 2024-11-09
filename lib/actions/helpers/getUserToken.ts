'use server'

import { cookies } from "next/headers";

export async function getUserToken() {
  return cookies().get("user")?.value;
}
