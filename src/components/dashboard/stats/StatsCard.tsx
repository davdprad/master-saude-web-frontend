import { StatsCardProps } from "./types";

export function StatsCard({
  icon: Icon,
  number,
  label,
  gradient,
  bgLight,
}: StatsCardProps) {
  return (
    <div className="group relative bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-xl transition-all overflow-hidden">
      <div
        className={`absolute inset-0 bg-linear-to-br ${gradient} opacity-0 group-hover:opacity-5 transition-opacity`}
      />

      <div className="relative">
        <div
          className={`w-12 h-12 ${bgLight} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
        >
          <Icon
            className={`w-6 h-6 bg-linear-to-br ${gradient} bg-clip-text text-transparent`}
            strokeWidth={2.5}
          />
        </div>

        <div
          className={`text-3xl md:text-4xl font-bold mb-2 bg-linear-to-br ${gradient} bg-clip-text text-transparent`}
        >
          {number}
        </div>

        <p className="text-xs md:text-sm font-semibold text-gray-600 uppercase tracking-wider">
          {label}
        </p>
      </div>
    </div>
  );
}
