import { LucideIcon } from "lucide-react";
import Card from "./Card";

export interface QuickActionsProps {
  title: string;
  content: string;
  icon: LucideIcon;
}

export default function QuickActionsCard({
  quickActionsList,
}: {
  quickActionsList: QuickActionsProps[];
}) {
  return (
    <Card className="p-7 mt-6 rounded-3xl">
      <h2 className="text-lg font-semibold text-slate-900">
        O que você pode fazer aqui
      </h2>
      <p className="mt-1 text-sm text-slate-700">
        Acesse rapidamente as principais funções do sistema.
      </p>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 mt-6">
        {quickActionsList.map((action, index) => (
          <CardDescription
            key={index}
            icon={action.icon}
            title={action.title}
            content={action.content}
          />
        ))}
      </div>
    </Card>
  );
}

function CardDescription({
  title,
  content,
  icon: Icon,
}: {
  title: string;
  content: string;
  icon: LucideIcon;
}) {
  return (
    <div className="flex gap-4 rounded-2xl bg-white ring-1 ring-black/5 p-5 hover:bg-slate-50/50 transition-all duration-300">
      <div className="h-10 w-10 rounded-xl bg-slate-100 ring-1 ring-black/10 shrink-0 grid place-items-center">
        <Icon size={18} className="text-slate-700" />
      </div>
      <div>
        <h2 className="text-base font-semibold text-gray-900">{title}</h2>
        <p className="mt-1 text-sm text-gray-600">{content}</p>
      </div>
    </div>
  );
}
