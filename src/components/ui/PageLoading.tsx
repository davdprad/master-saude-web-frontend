import { LoaderCircle } from "lucide-react";

type PageLoadingProps = {
  label?: string;
};

export default function PageLoading({
  label = "Carregando dados...",
}: PageLoadingProps) {
  return (
    <div className="min-h-[40vh] w-full flex items-center justify-center">
      <div className="flex flex-col items-center gap-3 text-gray-600">
        <LoaderCircle className="h-8 w-8 animate-spin text-indigo-600" />
        <p className="text-sm font-medium">{label}</p>
      </div>
    </div>
  );
}