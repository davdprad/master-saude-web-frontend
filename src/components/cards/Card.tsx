import { twMerge } from "tailwind-merge";

export default function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={twMerge(
        "rounded-2xl border border-gray-200 bg-white hover:shadow-sm overflow-hidden",
        className,
      )}
    >
      {children}
    </div>
  );
}
