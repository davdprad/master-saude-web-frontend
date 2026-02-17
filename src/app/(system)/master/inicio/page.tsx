import PresentationCard from "@/src/components/cards/PresentationCard";
import QuickActionsCard, {
  QuickActionsProps,
} from "@/src/components/cards/QuickActionsCard";
import { Building, Crown, Paperclip, Plus, Users } from "lucide-react";

const quickActionsList: QuickActionsProps[] = [
  {
    title: "Gestão de Colaboradores",
    content:
      "Visualize a lista de colaboradores vinculados às empresas parceiras.",
    icon: Users,
  },
  {
    title: "Gestão de Empresas",
    content: "Visualize a lista de empresas parceiras.",
    icon: Building,
  },
  {
    title: "Histórico e Exames",
    content: "Acesse rapidamente o histórico de exames de cada colaborador.",
    icon: Paperclip,
  },
  {
    title: "Criação de Usuários",
    content: "Crie novos usuários para acessar o sistema.",
    icon: Plus,
  },
];

export default function Page() {
  return (
    <>
      <PresentationCard
        accessText="Acesso administrativo"
        description="Aqui você acompanha os clientes, empresas parceiras e acessa o histórico de exames de forma rápida e organizada."
        icon={Crown}
      />

      <QuickActionsCard quickActionsList={quickActionsList} />
    </>
  );
}
