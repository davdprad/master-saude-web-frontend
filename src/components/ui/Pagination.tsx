import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./Button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex flex-row gap-3 items-center justify-between px-4 sm:px-3 py-3 border-t border-gray-100 bg-indigo-700">
      {/* Texto */}
      <span className="text-xs text-white text-center sm:text-left">
        Página <strong>{currentPage}</strong> de <strong>{totalPages}</strong>
      </span>

      {/* Controles */}
      <div className="flex items-center justify-center gap-2">
        <Button
          label="Anterior"
          onClick={() => onPageChange(currentPage - 1)}
          className="bg-white/10 ring-1 ring-white/20 hover:bg-white/20 hover:ring-white/30 text-xs text-white hover:text-white font-semibold p-2 gap-1"
          icon={ChevronLeft}
          iconSize={15}
          disabled={currentPage === 1}
        />
        <Button
          label="Próxima"
          onClick={() => onPageChange(currentPage + 1)}
          className="bg-white/10 ring-1 ring-white/20 hover:bg-white/20 hover:ring-white/30 text-xs text-white hover:text-white font-semibold p-2 gap-1"
          icon={ChevronRight}
          iconSize={15}
          disabled={currentPage === totalPages}
        />
      </div>
    </div>
  );
}
