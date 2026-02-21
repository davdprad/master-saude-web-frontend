"use client";

import { useState } from "react";
import { Filter, Search, Shield, UserRoundCheck, UsersRound } from "lucide-react";
import { toast } from "sonner";

import { StatsGrid } from "@/src/components/cards";
import InputSearch from "@/src/components/ui/InputSearch";
import SearchableSelect from "@/src/components/ui/SearchableSelect";
import RegisteredUsersTable from "@/src/components/tables/RegisteredUsersTable";
import { getCols } from "@/src/utils/gridUtils";

import { ROLE_OPTIONS } from "@/src/features/access/constants";
import { useRegisteredUsers } from "@/src/features/access/hooks/useRegisteredUsers";

export default function AccessManagerClient() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("");

  const {
    users,
    loading,
    total,
    totalMasters,
    totalConvenios,
    totalClientes,
    deletingId,
    currentPage,
    totalPages,
    setCurrentPage,
    removeUser,
  } = useRegisteredUsers({ searchTerm, selectedRole });

  const statsCards = [
    {
      icon: UsersRound,
      number: total,
      label: "Usuários Filtrados",
      color: "blue",
    },
    {
      icon: Shield,
      number: totalMasters,
      label: "Usuários Master",
      color: "indigo",
    },
    {
      icon: UserRoundCheck,
      number: totalConvenios + totalClientes,
      label: "Convênio + Cliente",
      color: "teal",
    },
  ];

  async function handleDelete(userId: number) {
    const confirmed = window.confirm(
      "Tem certeza que deseja excluir este usuário? Esta ação não pode ser desfeita.",
    );

    if (!confirmed) return;

    const result = await removeUser(userId);

    if (result.ok) {
      toast.success("Usuário excluído com sucesso.");
      return;
    }

    toast.error("Não foi possível excluir o usuário.");
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <StatsGrid stats={statsCards} cols={getCols(statsCards.length)} />

      <div className="flex flex-col lg:flex-row gap-4">
        <InputSearch
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Buscar por login..."
          icon={Search}
          debounceMs={500}
        />

        <SearchableSelect
          value={selectedRole}
          onChange={setSelectedRole}
          options={ROLE_OPTIONS}
          placeholder="Perfil"
          icon={Filter}
        />
      </div>

      <div
        className={`transition-all duration-300 ease-out ${
          loading
            ? "opacity-50 blur-[1px] pointer-events-none"
            : "opacity-100 blur-0"
        }`}
      >
        <RegisteredUsersTable
          users={users}
          deletingId={deletingId}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}