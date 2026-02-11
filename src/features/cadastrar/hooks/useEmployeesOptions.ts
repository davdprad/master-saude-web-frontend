"use client";

import { useEffect, useState } from "react";
import { SelectOption } from "@/src/types/optionsSelect";
import { getCompanies } from "@/src/services/company";
import {
  mapNidCompaniesToOptions,
  mapNidEmployeesToOptions,
} from "@/src/utils/mapToOptions";
import { getEmployees } from "@/src/services/employee";

type UseEmployeesOptionsParams = {
  employeeQuery: string;
  selectedEmployee: string;
};

export function useEmployeesOptions({
  employeeQuery,
  selectedEmployee,
}: UseEmployeesOptionsParams) {
  const [optionsEmployee, setOptionsEmployee] = useState<SelectOption[]>([
    { label: "Todos os funcionários", value: "" },
  ]);

  useEffect(() => {
    let cancelled = false;

    async function loadEmployee() {
      try {
        const data = await getEmployees({
          nome: employeeQuery || selectedEmployee || null,
        });

        if (cancelled) return;

        const options = mapNidEmployeesToOptions(data.employees);
        setOptionsEmployee(options);
      } catch (err) {
        if (cancelled) return;
        console.error("Erro ao buscar funcionários:", err);
        setOptionsEmployee([{ label: "Todas as empresas", value: "" }]);
      }
    }

    loadEmployee();

    return () => {
      cancelled = true;
    };
  }, [employeeQuery, selectedEmployee]);

  return { optionsEmployee, setOptionsEmployee };
}
