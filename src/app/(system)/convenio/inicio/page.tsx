import PresentationCard from "@/src/components/cards/PresentationCard";
import QuickActionsCard, {
  QuickActionsProps,
} from "@/src/components/cards/QuickActionsCard";
import { Building, Crown, Paperclip, Plus, Users } from "lucide-react";

const quickActionsList: QuickActionsProps[] = [
  {
    title: "Gestão de Colaboradores",
    content: "Visualize a lista de colaboradores vinculados à sua empresa.",
    icon: Users,
  },
  {
    title: "Histórico e Exames",
    content: "Acesse rapidamente o histórico de exames de cada colaborador.",
    icon: Paperclip,
  },
];

export default function Page() {
  return (
    <>
      <PresentationCard
        accessText="Acesso convênio"
        description="Aqui você acompanha seus colaboradores e acessa o histórico de exames de forma rápida e organizada."
        icon={Building}
      />

      <QuickActionsCard quickActionsList={quickActionsList} />
    </>
  );
}
