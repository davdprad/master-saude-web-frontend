"use client";

import { useState } from "react";
import { AuthSession, Role } from "@/src/types/auth";
import { postLogin } from "@/src/services/auth";

export function useLogin(role: Role) {
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  async function login(login: string, senha: string, captchaToken: string | null) {
    setFormError(null);

    if (!login.trim() || !senha.trim()) {
      setFormError("Preencha login e senha.");
      return { ok: false as const };
    }

    if (!captchaToken) {
      setFormError("Confirme que você não é um robô.");
      return { ok: false as const };
    }

    setLoading(true);
    try {
      const data: AuthSession = await postLogin(role, { login, senha });
      return { ok: true as const, data };
    } catch (err: unknown) {
      const axiosLikeError = err as {
        response?: { data?: { message?: string } };
        message?: string;
      };

      const message =
        axiosLikeError?.response?.data?.message ||
        axiosLikeError?.message ||
        "Login ou senha inválidos.";

      setFormError(message);
      return { ok: false as const };
    } finally {
      setLoading(false);
    }
  }

  return { login, loading, formError };
}
