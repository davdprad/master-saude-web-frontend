import { AccordionProps } from "@/src/types/accordion";
import Accordion from "../ui/Accordion";
import Card from "./Card";

export default function Instructions({
  accordions,
}: {
  accordions: AccordionProps[];
}) {
  return (
    <Card>
      <div className="border-b border-gray-200 p-5 bg-linear-to-r from-indigo-50 to-blue-50">
        <h2 className="text-lg font-semibold text-slate-900">
          Instruções de Exames
        </h2>
        <p className="text-sm text-slate-600">
          Confira as orientações antes do atendimento
        </p>
      </div>

      <div className="flex flex-col p-4 md:p-4 gap-2">
        {accordions.map((accordion, idx) => (
          <Accordion
            key={idx}
            title={accordion.title}
            description={accordion.description}
            items={accordion.items}
          />
        ))}
      </div>
    </Card>
  );
}
