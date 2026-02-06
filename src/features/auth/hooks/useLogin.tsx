"use client";

import { useState } from "react";
import { AuthTokens } from "@/src/types/auth";
import { postLogin } from "@/src/services/auth";

export function useLogin(apiEndpoint: string) {
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  async function login(login: string, senha: string) {
    setFormError(null);

    if (!login.trim() || !senha.trim()) {
      setFormError("Preencha login e senha.");
      return { ok: false as const };
    }

    setLoading(true);
    try {
      const data: AuthTokens = await postLogin(apiEndpoint, { login, senha });

      // Tokens de acesso
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("refresh_token", data.refresh_token);

      // Informações sobre o role
      localStorage.setItem("role", data.role);
      if (data.company_id != null)
        localStorage.setItem("company_id", String(data.company_id));
      if (data.employee_id != null)
        localStorage.setItem("employee_id", String(data.employee_id));

      return { ok: true as const, data };
    } catch (err: any) {
      // Se seu axios/api já normaliza erro, aqui pode ficar simples
      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Login ou senha inválidos.";

      setFormError(message);
      return { ok: false as const };
    } finally {
      setLoading(false);
    }
  }

  return { login, loading, formError };
}
