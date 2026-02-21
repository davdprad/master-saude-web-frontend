import { RegisteredUsersResponse } from "@/src/types/registeredUser";
import { api } from "./api";

export async function getRegisteredUsers(): Promise<RegisteredUsersResponse> {
  const response = await api.get<RegisteredUsersResponse>("/register/usuarios");
  return response.data;
}

export async function deleteRegisteredUser(userId: number): Promise<void> {
  await api.post(`/register/usuarios/${userId}/excluir`);
}