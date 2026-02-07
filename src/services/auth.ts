import { api } from "./api";
import { AuthSession, LoginPayload, Role } from "@/src/types/auth";

export async function postLogin(role: Role, payload: LoginPayload) {
  const res = await api.post<AuthSession>(`/auth/login/${role}`, payload);
  return res.data;
}

export async function postLogout() {
  await api.post("/auth/logout");
}
