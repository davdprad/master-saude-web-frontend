import { StatsCard } from "./StatsCard";
import { StatsCardProps } from "./types";

interface StatsGridProps {
  stats: StatsCardProps[];
  cols: 1 | 2 | 3 | 4;
}

const gridColsMap: Record<1 | 2 | 3 | 4, string> = {
  1: "xl:grid-cols-1",
  2: "xl:grid-cols-2",
  3: "xl:grid-cols-3",
  4: "xl:grid-cols-4",
};

export function StatsGrid({ stats, cols }: StatsGridProps) {
  return (
    <div
      className={`grid grid-cols-1 sm:grid-cols-2 ${gridColsMap[cols]} gap-4 md:gap-6`}
    >
      {stats.map((stat, index) => (
        <StatsCard key={index} {...stat} />
      ))}
    </div>
  );
}
