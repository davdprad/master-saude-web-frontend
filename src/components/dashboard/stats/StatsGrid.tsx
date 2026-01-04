import { StatsCard } from "./StatsCard";
import { StatsCardProps } from "./types";

interface StatsGridProps {
  stats: StatsCardProps[];
}

export function StatsGrid({ stats }: StatsGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
      {stats.map((stat, index) => (
        <StatsCard key={index} {...stat} />
      ))}
    </div>
  );
}
