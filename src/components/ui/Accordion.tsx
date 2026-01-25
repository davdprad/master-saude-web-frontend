import { AccordionProps } from "@/src/types/accordion";
import { ChevronRight } from "lucide-react";
import { useId, useState } from "react";

export default function Accordion({
  title,
  description,
  items,
}: AccordionProps) {
  const [open, setOpen] = useState(false);
  const contentId = useId();

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
      {/* Header */}
      <button
        type="button"
        aria-expanded={open}
        aria-controls={contentId}
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 text-left"
      >
        <div>
          <p className="text-sm font-semibold text-slate-900">{title}</p>
          <p className="mt-1 text-sm text-slate-600">{description}</p>
        </div>

        <span
          className={[
            "grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-indigo-50 text-slate-900",
            "transition-transform duration-200",
            open ? "rotate-180" : "",
          ].join(" ")}
        >
          <ChevronRight className="h-4 w-4 rotate-90" />
        </span>
      </button>

      {/* Content (altura animada com grid-rows) */}
      <div
        id={contentId}
        className={[
          "grid transition-[grid-template-rows] duration-300 ease-in-out",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        ].join(" ")}
      >
        <div className="overflow-hidden">
          {/* fade + slide (abre e fecha) */}
          <div
            className={[
              "mt-4 space-y-3 transition-all duration-300 ease-in-out",
              open ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1",
            ].join(" ")}
          >
            <ul className="space-y-2 text-sm text-slate-700">
              {items.map((item, idx) => (
                <li key={idx} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
