import { api } from "./api";
import { AuthTokens, LoginPayload } from "@/src/types/auth";

export async function postLogin(
  apiEndpoint: string,
  payload: LoginPayload,
): Promise<AuthTokens> {
  const response = await api.post<AuthTokens>(apiEndpoint, payload);
  return response.data;
}
