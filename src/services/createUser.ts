import { toast } from "sonner";
import { Role } from "../types/auth";
import { CreateUserPayload, CreateUserResponse } from "../types/createUser";
import { api } from "./api";
import axios from "axios";

export async function postCreateUser(
  role: Role,
  payload: CreateUserPayload,
): Promise<CreateUserResponse> {
  try {
    const response = await api.post<CreateUserResponse>(
      `/register/${role}`,
      payload,
    );

    toast.success("Usuário criado com sucesso!");
    return response.data;
  } catch (err) {
    const message = axios.isAxiosError(err)
      ? // tenta pegar vários formatos comuns
        ((err.response?.data as any)?.message ??
        (err.response?.data as any)?.detail ??
        err.message ??
        "Erro ao criar usuário")
      : "Erro ao criar usuário";

    toast.error(message);
    throw err;
  }
}
