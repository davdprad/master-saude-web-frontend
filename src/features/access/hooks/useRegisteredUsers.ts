"use client";

import { useEffect, useMemo, useState } from "react";
import {
  deleteRegisteredUser,
  getRegisteredUsers,
} from "@/src/services/registeredUsers";
import { ITEMS_PER_PAGE } from "@/src/features/access/constants";
import { RegisteredUser } from "@/src/types/registeredUser";

type UseRegisteredUsersParams = {
  searchTerm: string;
  selectedRole: string;
};

export function useRegisteredUsers({
  searchTerm,
  selectedRole,
}: UseRegisteredUsersParams) {
  const [users, setUsers] = useState<RegisteredUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        const data = await getRegisteredUsers();
        if (cancelled) return;
        setUsers(data.users || []);
      } catch (err) {
        if (cancelled) return;
        console.error("Erro ao buscar usuários:", err);
        setUsers([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, []);

  const filteredUsers = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return users.filter((user) => {
      const matchesSearch = normalizedSearch
        ? user.login.toLowerCase().includes(normalizedSearch)
        : true;

      const matchesRole = selectedRole ? user.role === selectedRole : true;

      return matchesSearch && matchesRole;
    });
  }, [users, searchTerm, selectedRole]);

  const total = filteredUsers.length;

  const totalMasters = useMemo(
    () => users.filter((user) => user.role === "master").length,
    [users],
  );

  const totalConvenios = useMemo(
    () => users.filter((user) => user.role === "convenio").length,
    [users],
  );

  const totalClientes = useMemo(
    () => users.filter((user) => user.role === "cliente").length,
    [users],
  );

  const totalPages = Math.max(1, Math.ceil(total / ITEMS_PER_PAGE));

  useEffect(() => {
    setCurrentPage((prev) => Math.min(prev, totalPages));
  }, [totalPages]);

  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredUsers.slice(startIndex, endIndex);
  }, [filteredUsers, currentPage]);

  async function removeUser(userId: number) {
    try {
      setDeletingId(userId);
      await deleteRegisteredUser(userId);
      setUsers((prev) => prev.filter((user) => user.id !== userId));
      return { ok: true as const };
    } catch (err) {
      console.error("Erro ao excluir usuário:", err);
      return { ok: false as const };
    } finally {
      setDeletingId(null);
    }
  }

  return {
    users: paginatedUsers,
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
  };
}