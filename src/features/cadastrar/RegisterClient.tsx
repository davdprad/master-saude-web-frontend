"use client";

import { useState } from "react";
import InputSearch from "@/src/components/ui/InputSearch";
import SearchableSelect from "@/src/components/ui/SearchableSelect";
import { Building, User, UserCircle } from "lucide-react";
import { useCompanyOptions } from "@/src/features/cadastrar/hooks/useCompanyOptions";
import { useEmployeesOptions } from "@/src/features/cadastrar/hooks/useEmployeesOptions";
import { useCreateUserForm } from "./hooks/useCreateUserForm";
import { RoleTabs } from "./components/roleTabs";
import { ROLE_HELPER_TEXT, ROLE_ICONS, ROLES } from "./constants";
import { PasswordSection } from "./components/PasswordSection";
import { SuccessCard } from "./components/SuccessCard";
import { Button } from "@/src/components/ui/Button";

export default function RegisterClient() {
  const [selectedCompany, setSelectedCompany] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [companyQuery, setCompanyQuery] = useState("");
  const [employeeQuery, setEmployeeQuery] = useState("");

  const {
    role,
    setRole,
    username,
    setUsername,
    nivelConvenio,
    setNivelConvenio,
    password,
    regeneratePassword,
    created,
    loading,
    errors,
    submit,
    copyPassword,
  } = useCreateUserForm({ selectedEmployee, selectedCompany });

  const { optionsCompany } = useCompanyOptions({
    companyQuery,
    selectedCompany,
  });

  const { optionsEmployee } = useEmployeesOptions({
    employeeQuery,
    selectedEmployee,
  });

  return (
    <div className="mx-auto max-w-3xl pb-12">
      <div className="mb-8 text-center sm:text-left">
        <h1 className="text-2xl font-bold text-slate-900">
          Cadastro de Usuários
        </h1>
        <p className="text-sm text-slate-600">
          Gerencie e crie novos acessos para o sistema Master Saúde.
        </p>
      </div>

      <RoleTabs
        roles={ROLES}
        role={role}
        onChange={setRole}
        roleIcons={ROLE_ICONS}
      />

      <form
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
        className="rounded-2xl bg-white p-8 shadow-sm transition-all ring-1 ring-black/5 hover:ring-slate-300/90"
      >
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
            Configurações de {ROLES.find((r) => r.value === role)?.label}
          </h2>
          <p className="text-xs text-slate-800">{ROLE_HELPER_TEXT[role]}</p>
          {errors.form && (
            <p className="mt-3 text-sm font-medium text-rose-600">
              {errors.form}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 mb-1.5">
          <div className={role === "master" ? "md:col-span-2" : ""}>
            <label className="mb-1.5 block text-sm font-medium text-slate-800">
              Nome de usuário
            </label>
            <InputSearch
              value={username}
              onChange={setUsername}
              placeholder="ex: maria.jose"
              icon={User}
            />
            {errors.username && (
              <p className="mt-1.5 text-xs text-rose-600 font-medium">
                {errors.username}
              </p>
            )}
          </div>

          {role !== "master" && (
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-800">
                Empresa Vinculada
              </label>

              <SearchableSelect
                value={selectedCompany}
                onChange={setSelectedCompany}
                setQuery={setCompanyQuery}
                options={optionsCompany}
                placeholder="Empresas"
                icon={Building}
                debounceMs={500}
              />

              {errors.empresaId && (
                <p className="mt-1.5 text-xs text-rose-600 font-medium">
                  {errors.empresaId}
                </p>
              )}
            </div>
          )}
        </div>

        {role === "cliente" && (
          <div className="mt-6">
            <label className="mb-1.5 block text-sm font-medium text-slate-800">
              Funcionário
            </label>

            <SearchableSelect
              value={selectedEmployee}
              onChange={setSelectedEmployee}
              setQuery={setEmployeeQuery}
              options={optionsEmployee}
              placeholder="Funcionário"
              icon={UserCircle}
              debounceMs={500}
            />
          </div>
        )}

        <div className="my-8 h-px bg-slate-200" />

        <div className="flex flex-col mb-6 md:flex-row md:items-end">
          <PasswordSection
            password={password}
            onGenerate={regeneratePassword}
            onCopy={() => copyPassword(password)}
            role={role}
            nivelConvenio={nivelConvenio}
            setNivelConvenio={setNivelConvenio}
            errors={errors}
          />
        </div>

        <div className="flex justify-end">
          <Button
            type="submit"
            label={loading ? "Processando..." : "Finalizar Cadastro"}
            className="bg-indigo-700 text-white ring-1 ring-indigo-600 text-sm px-3 py-2 gap-2 rounded-xl hover:bg-indigo-800 hover:text-white transition-all duration-300 shadow-[0_0_15px_5px_rgba(99,102,241,0.4)]"
          />
        </div>
      </form>

      {created && (
        <SuccessCard
          created={created}
          onCopyAgain={() => copyPassword(created.password)}
        />
      )}
    </div>
  );
}
