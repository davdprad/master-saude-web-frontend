import { StatsCardProps } from "./types";

type ThemeColor = "yellow" | "blue" | "green" | "red" | "indigo";

const THEMES: Record<
  ThemeColor,
  {
    text: string;
    icon: string;
    bg: string;
    hoverBg: string;
  }
> = {
  blue: {
    text: "text-blue-600",
    icon: "text-blue-600",
    bg: "bg-blue-100/60",
    hoverBg: "hover:bg-blue-50/60",
  },
  green: {
    text: "text-green-600",
    icon: "text-green-600",
    bg: "bg-green-100/60",
    hoverBg: "hover:bg-green-50/60",
  },
  red: {
    text: "text-red-600",
    icon: "text-red-600",
    bg: "bg-red-100/60",
    hoverBg: "hover:bg-red-50/60",
  },
  yellow: {
    text: "text-yellow-700",
    icon: "text-yellow-700",
    bg: "bg-yellow-100/60",
    hoverBg: "hover:bg-yellow-50/60",
  },
  indigo: {
    text: "text-indigo-600",
    icon: "text-indigo-600",
    bg: "bg-indigo-100/60",
    hoverBg: "hover:bg-indigo-50/60",
  },
};

export function StatsCard({
  icon: Icon,
  number,
  label,
  color = "indigo",
}: StatsCardProps & { color?: ThemeColor }) {
  const theme = THEMES[color];

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-5 transition-all
                 hover:-translate-y-0.5 hover:shadow-sm ${theme.hoverBg}`}
    >
      <div className="relative">
        <div className="mb-3 flex items-center gap-4">
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-xl transition-transform
                        ${theme.bg} group-hover:scale-110`}
          >
            <Icon className={`h-6 w-6 ${theme.icon}`} strokeWidth={2.5} />
          </div>

          <div className={`text-2xl font-bold md:text-3xl ${theme.text}`}>
            {number}
          </div>
        </div>

        <p className="text-sm font-semibold uppercase tracking-wider text-gray-600">
          {label}
        </p>
      </div>
    </div>
  );
}
