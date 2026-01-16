import { StatsCardProps } from "./types";

export function StatsCard({
  icon: Icon,
  number,
  label,
  color,
  bgLight,
}: StatsCardProps) {
  return (
    <div
      className={`group relative bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-lg transition-all overflow-hidden`}
    >
      <div
        className={`absolute inset-0 opacity-0 ${bgLight} group-hover:opacity-60 transition-all duration-300 ease-out`}
      />

      <div className="relative">
        <div className="flex gap-4">
          <div
            className={`w-12 h-12 ${bgLight} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
          >
            <Icon
              className={`w-6 h-6 bg-linear-to-br text-${color} bg-clip-text `}
              strokeWidth={2.5}
            />
          </div>

          <div className={`text-3xl md:text-4xl font-bold mb-2 text-${color}`}>
            {number}
          </div>
        </div>

        <p className="text-xs md:text-sm font-semibold text-gray-600 uppercase tracking-wider">
          {label}
        </p>
      </div>
    </div>
  );
}
