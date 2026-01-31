"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Home,
  FileText,
  Info,
  LogOut,
  QrCode,
  Camera,
  Clock,
  ChevronRight,
} from "lucide-react";
import { useState, useId } from "react";
import QrScanner from "@/src/utils/qrScanner";
import QrScannerCard from "@/src/components/cards/QrScannerCard";
import InQueueCard from "@/src/components/cards/InQueueCard";
import Card from "@/src/components/cards/Card";
import Accordion from "@/src/components/ui/Accordion";
import Instructions from "@/src/components/cards/Instructions";

export default function ColabDashboardPage() {
  const [inQueue, setInQueue] = useState(false);
  const position = 4;

  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [qrData, setQrData] = useState("");

  function handleSuccess(text: string) {
    setQrData(text);
    setInQueue(true);
    setOpen(false);
  }

  function handleError(err: string) {
    setError(err);
  }

  const examsAccordions = [
    {
      title: "ASO (Atestado de Saúde Ocupacional)",
      description: "O ASO é um exame simples e não exige preparo especial.",
      items: [
        "Não é necessário jejum.",
        "Compareça com 15 minutos de antecedência.",
        "Traga um documento com foto.",
      ],
    },
    {
      title: "Audiometria",
      description: "Para o exame de audiometria, é crucial o repouso auditivo.",
      items: [
        "Evite ambientes com ruído alto por 14 horas antes do exame.",
        "Não utilize fones de ouvido no dia do exame.",
        "Informe ao médico se estiver gripado ou com o nariz entupido.",
      ],
    },
    {
      title: "Exames de Sangue (Laboratoriais)",
      description: "A maioria dos exames de sangue exige jejum.",
      items: [
        "Jejum de 8 a 12 horas (apenas água é permitido).",
        "Evite exercícios físicos intensos na véspera.",
        "Informe todos os medicamentos de uso contínuo.",
      ],
    },
    {
      title: "Eletrocardiograma (ECG)",
      description:
        "O eletrocardiograma avalia a atividade elétrica do coração e é indolor.",
      items: [
        "Não é necessário jejum.",
        "Evite cremes ou óleos no peito no dia do exame.",
        "Use roupas confortáveis para facilitar o procedimento.",
      ],
    },
    {
      title: "Raio-X de Tórax",
      description:
        "O raio-X de tórax avalia pulmões e estruturas do tórax de forma rápida.",
      items: [
        "Não é necessário jejum.",
        "Retire objetos metálicos da região do tórax.",
        "Informe se houver possibilidade de gravidez.",
      ],
    },
    {
      title: "Espirometria",
      description:
        "A espirometria avalia a função pulmonar e a capacidade respiratória.",
      items: [
        "Evite fumar por pelo menos 1 hora antes do exame.",
        "Não realize exercícios físicos intensos no dia do exame.",
        "Siga corretamente as orientações do profissional durante o teste.",
      ],
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Main */}
      <main className="space-y-6">
        {/* Cards: check-in / fila */}
        {!inQueue ? (
          <QrScannerCard
            handleSuccess={handleSuccess}
            handleError={handleError}
            error={error}
          />
        ) : (
          <InQueueCard position={3} />
        )}

        <Instructions accordions={examsAccordions} />
      </main>
    </div>
  );
}
