import { ChevronLeft, ChevronRight } from "lucide-react";

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
    <div className="flex flex-row gap-3 items-center justify-between px-4 sm:px-6 py-2 border-t border-gray-100 bg-linear-to-r from-indigo-50 to-blue-50">
      {/* Texto */}
      <span className="text-sm text-gray-600 text-center sm:text-left">
        Página <strong>{currentPage}</strong> de <strong>{totalPages}</strong>
      </span>

      {/* Controles */}
      <div className="flex items-center justify-center gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg border border-gray-200 bg-white hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
        >
          <ChevronLeft size={16} />
          <span className="hidden sm:inline">Anterior</span>
        </button>

        {/* Números – só desktop */}
        {/* <div className="hidden sm:flex items-center gap-1">
          {Array.from({ length: totalPages }).map((_, index) => {
            const page = index + 1;
            const isActive = page === currentPage;

            return (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                className={`w-9 h-9 rounded-lg text-sm font-semibold transition ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-md"
                    : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
                }`}
              >
                {page}
              </button>
            );
          })}
        </div> */}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg border border-gray-200 bg-white hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
        >
          <span className="hidden sm:inline">Próxima</span>
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
