"use server";

import { API_URL } from "@/lib/constants/constants";
import { getUserToken } from "../../helpers/getUserToken";
import { CreateCompanyUser } from "@/types/schema-types";

export async function createUser(userInformation: UserCreationPayload) {
  const { email, password, role } = userInformation;
  const token = await getUserToken();

  try {
    const res = await fetch(`${API_URL}/v1/User/Register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ email, password, role }),
    });

    return { status: res.status, message: res.statusText };
  } catch (error) {
    console.error(error);
    return { status: 500, message: "Internal Server Error" };
  }
}

export async function createCompanyUser(userInformation: CreateCompanyUser) {
  const { email, password } = userInformation;
  const token = await getUserToken();

  try {
    const res = await fetch(`${API_URL}/v1/User/RegisterForCompany`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ email, password }),
    });

    return res.ok
      ? { status: 200, message: "Successfully created the user" }
      : { status: res.status, message: res.statusText };
  } catch (error) {
    console.error(error);
    return { status: 500, message: "Internal Server Error" };
  }
}
