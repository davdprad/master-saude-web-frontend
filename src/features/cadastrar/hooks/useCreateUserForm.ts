"use client";

import { useEffect, useMemo, useState } from "react";
import type { ConvenioNivel, CreatedUser, Errors } from "../types";
import { generatePassword } from "../utils/generatePassword";
import { postCreateUser } from "@/src/services/createUser";
import { CreateUserResponse } from "@/src/types/createUser";
import { Role } from "@/src/types/auth";

export function useCreateUserForm() {
  const [role, setRole] = useState<Role>("master");

  // inputs
  const [username, setUsername] = useState("");

  // selects (feature)
  const [selectedCompany, setSelectedCompany] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState("");

  // convenio
  const [nivelConvenio, setNivelConvenio] = useState<ConvenioNivel>(1);

  // senha
  const [password, setPassword] = useState(() => generatePassword(8));

  // ui state
  const [created, setCreated] = useState<CreatedUser | null>(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Errors>({});

  useEffect(() => {
    setErrors({});
    setCreated(null);
    setPassword(generatePassword(8));

    if (role === "master") {
      setSelectedCompany("");
      setSelectedEmployee("");
      setNivelConvenio(1);
    }

    if (role === "convenio") {
      setSelectedEmployee("");
    }

    if (role === "cliente") {
      setNivelConvenio(1);
    }
  }, [role]);

  function validate(): Errors {
    const e: Errors = {};

    if (!username.trim()) e.username = "Informe o nome de usuário.";
    if (role !== "master" && !selectedCompany)
      e.empresaId = "Selecione uma empresa.";

    // se você quiser obrigar funcionário no CLIENTE:
    if (role === "cliente" && !selectedEmployee)
      e.form = "Selecione um funcionário.";

    if (role === "convenio" && ![1, 2].includes(nivelConvenio)) {
      e.nivelConvenio = "Selecione um nível válido.";
    }

    return e;
  }

  async function submit() {
    setCreated(null);

    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return;

    setLoading(true);
    try {
      const payload = {
        login: username.trim(),
        senha: password,
        ...(role === "convenio" ? { company_id: selectedCompany } : {}),
        ...(role === "convenio" ? { access_level: nivelConvenio } : {}),
        ...(role === "cliente" ? { company_id: selectedCompany } : {}),
        ...(role === "cliente" ? { employee_id: selectedEmployee } : {}),
      };

      const data: CreateUserResponse = await postCreateUser(role, payload);

      setCreated({
        role: role,
        username: payload.login,
        password: payload.senha,
      });

      return { ok: true as const, data };
    } catch {
      setErrors((prev) => ({
        ...prev,
        form: "Não foi possível criar o usuário. Tente novamente.",
      }));
    } finally {
      setLoading(false);
    }
  }

  async function copyPassword(pwd: string) {
    try {
      await navigator.clipboard.writeText(pwd);
      setCreated((prev) =>
        prev
          ? { ...prev, copied: true }
          : { role, username, password: pwd, copied: true },
      );
      setTimeout(() => {
        setCreated((prev) => (prev ? { ...prev, copied: false } : prev));
      }, 1200);
    } catch {
      // ignora
    }
  }

  function regeneratePassword() {
    setPassword(generatePassword(8));
  }

  return {
    // state
    role,
    username,
    selectedCompany,
    selectedEmployee,
    nivelConvenio,
    password,
    created,
    loading,
    errors,

    // setters
    setRole,
    setUsername,
    setSelectedCompany,
    setSelectedEmployee,
    setNivelConvenio,

    // actions
    submit,
    copyPassword,
    regeneratePassword,
  };
}
