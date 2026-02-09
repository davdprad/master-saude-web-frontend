import { StatsCardProps } from "./types";

type ThemeColor =
  | "yellow"
  | "blue"
  | "green"
  | "red"
  | "indigo"
  | "purple"
  | "teal";

const THEMES: Record<
  ThemeColor,
  {
    text: string;
    icon: string;
    iconBg: string;
    gradient: string;
    glow: string;
    border: string;
  }
> = {
  blue: {
    text: "text-sky-700",
    icon: "text-sky-600",
    iconBg: "bg-gradient-to-br from-sky-50 to-sky-100/50",
    gradient: "from-sky-500/5 to-transparent",
    glow: "group-hover:shadow-sky-500/10",
    border: "border-b-sky-700",
  },
  green: {
    text: "text-emerald-700",
    icon: "text-emerald-600",
    iconBg: "bg-gradient-to-br from-emerald-50 to-emerald-100/50",
    gradient: "from-emerald-500/5 to-transparent",
    glow: "group-hover:shadow-emerald-500/10",
    border: "border-b-emerald-700",
  },
  red: {
    text: "text-rose-700",
    icon: "text-rose-600",
    iconBg: "bg-gradient-to-br from-rose-50 to-rose-100/50",
    gradient: "from-rose-500/5 to-transparent",
    glow: "group-hover:shadow-rose-500/10",
    border: "border-b-rose-700",
  },
  yellow: {
    text: "text-amber-700",
    icon: "text-amber-600",
    iconBg: "bg-gradient-to-br from-amber-50 to-amber-100/50",
    gradient: "from-amber-500/5 to-transparent",
    glow: "group-hover:shadow-amber-500/10",
    border: "border-b-amber-700",
  },
  indigo: {
    text: "text-indigo-700",
    icon: "text-indigo-600",
    iconBg: "bg-gradient-to-br from-indigo-50 to-indigo-100/50",
    gradient: "from-indigo-500/5 to-transparent",
    glow: "group-hover:shadow-indigo-500/10",
    border: "border-b-indigo-700",
  },
  purple: {
    text: "text-purple-700",
    icon: "text-purple-600",
    iconBg: "bg-gradient-to-br from-purple-50 to-purple-100/50",
    gradient: "from-purple-500/5 to-transparent",
    glow: "group-hover:shadow-purple-500/10",
    border: "border-b-purple-700",
  },
  teal: {
    text: "text-teal-700",
    icon: "text-teal-600",
    iconBg: "bg-gradient-to-br from-teal-50 to-teal-100/50",
    gradient: "from-teal-500/5 to-transparent",
    glow: "group-hover:shadow-teal-500/10",
    border: "border-b-teal-700",
  },
};

export function StatsCard({
  icon: Icon,
  number,
  label,
  color = "indigo",
}: StatsCardProps & {
  color?: ThemeColor;
}) {
  const theme = THEMES[color];

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl bg-white 
                 p-5 transition-all duration-300
                 hover:-translate-y-1 hover:shadow-lg ${theme.glow}
                 cursor-pointer border-5 ${theme.border} border-x-0 border-t-0
                 ring-1 ring-gray-200/60`}
    >
      {/* Gradient background */}
      <div
        className={`absolute inset-0 bg-linear-to-br opacity-0 
                   group-hover:opacity-100 transition-opacity duration-300 ${theme.gradient}`}
      />

      <div className="relative">
        {/* Icon */}
        <div className="flex gap-4 mb-4">
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-xl 
                       transition-all duration-300 ${theme.iconBg}
                       group-hover:scale-110 group-hover:rotate-3
                       shadow-sm ring-1 ring-black/5`}
          >
            <Icon className={`h-6 w-6 ${theme.icon}`} strokeWidth={2.5} />
          </div>

          {/* Number */}
          <div
            className={`text-3xl font-bold mb-2 md:text-4xl ${theme.text} 
                        tracking-tight transition-colors`}
          >
            {number.toLocaleString()}
          </div>
        </div>

        {/* Label */}
        <p
          className="text-[13px] font-semibold uppercase tracking-wide text-gray-500 
                     group-hover:text-gray-600 transition-colors leading-tight"
        >
          {label}
        </p>
      </div>

      {/* Shine effect on hover */}
      <div
        className="absolute inset-0 -translate-x-full group-hover:translate-x-full 
                     transition-transform duration-1000 ease-out pointer-events-none"
      >
        <div
          className="h-full w-1/2 bg-linear-to-r from-transparent via-white/20 to-transparent 
                       skew-x-12"
        />
      </div>
    </div>
  );
}
