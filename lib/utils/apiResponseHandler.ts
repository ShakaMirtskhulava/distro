"use client";

import { toast } from "react-hot-toast";

type ApiResponseValidatorOptions =
  | { outputGenericErrors: boolean; customErrors?: never }
  | { outputGenericErrors?: never; customErrors: Record<number, string> };

type ApiResponseValidator = {
  res: ServerActionResponsePayload;
  options?: ApiResponseValidatorOptions;
};

const statusMessages: Record<number, string> = {
  200: "Successfully completed the action",
  400: "Bad Request",
  401: "Unauthorized",
  403: "Forbidden",
  404: "Not Found",
  409: "Conflict",
  500: "Internal Server Error",
};

function generateToastResponse(status: number, serverMessage: string, options?: ApiResponseValidatorOptions) {
  const genericMessage = statusMessages[status] || "Unexpected error";
  let message;

  if (options?.customErrors) {
    message = options.customErrors[status] || genericMessage;
  } else {
    message = genericMessage;
  }

  const toastFunction = status === 200 ? toast.success : toast.error;
  toastFunction(message);
}

export async function apiResponseHandler({ res, options }: ApiResponseValidator): Promise<boolean> {
  const { status, message } = res;
  generateToastResponse(status, message, options);
  return status === 200;
}
