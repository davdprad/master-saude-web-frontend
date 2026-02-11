export function Info({
  label,
  value,
  mono,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="rounded-xl border border-emerald-200 bg-white p-3">
      <p className="text-xs font-medium text-emerald-700">{label}</p>
      <p
        className={[
          "mt-1 text-sm text-slate-900",
          mono ? "font-mono" : "",
        ].join(" ")}
      >
        {value}
      </p>
    </div>
  );
}
