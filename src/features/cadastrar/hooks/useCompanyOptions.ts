"use client";

import { useEffect, useState } from "react";
import { SelectOption } from "@/src/types/optionsSelect";
import { getCompanies } from "@/src/services/company";
import { mapNidCompaniesToOptions } from "@/src/utils/mapToOptions";

type UseCompanyOptionsParams = {
  companyQuery: string;
  selectedCompany: string;
};

export function useCompanyOptions({
  companyQuery,
  selectedCompany,
}: UseCompanyOptionsParams) {
  const [optionsCompany, setOptionsCompany] = useState<SelectOption[]>([
    { label: "Todas as empresas", value: "" },
  ]);

  useEffect(() => {
    let cancelled = false;

    async function loadCompanies() {
      try {
        const data = await getCompanies({
          empresa: companyQuery || selectedCompany || null,
        });

        if (cancelled) return;

        const options = mapNidCompaniesToOptions(data.companies);
        setOptionsCompany(options);
      } catch (err) {
        if (cancelled) return;
        console.error("Erro ao buscar empresas:", err);
        setOptionsCompany([{ label: "Todas as empresas", value: "" }]);
      }
    }

    loadCompanies();

    return () => {
      cancelled = true;
    };
  }, [companyQuery, selectedCompany]);

  return { optionsCompany, setOptionsCompany };
}
