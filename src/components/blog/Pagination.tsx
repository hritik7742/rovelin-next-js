'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const showPages = pages.filter((page) => {
    if (page === 1 || page === totalPages) return true;
    if (page >= currentPage - 1 && page <= currentPage + 1) return true;
    return false;
  });

  const btnBase =
    'h-10 min-w-[40px] rounded-lg font-medium transition-all duration-200 border px-3';
  const btnInactive =
    'border-purple-900/40 text-gray-400 hover:border-purple-500 hover:text-purple-300';
  const btnActive = 'border-purple-600 text-white font-bold';

  return (
    <div className="flex items-center justify-center gap-2 mt-16 pb-8">
      {/* Prev */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`${btnBase} ${btnInactive} disabled:opacity-30 disabled:cursor-not-allowed p-2`}
        style={{ background: 'rgba(15, 23, 42, 0.6)' }}
        aria-label="Previous page"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {showPages.map((page, index) => {
        const prevPage = showPages[index - 1];
        const showEllipsis = prevPage && page - prevPage > 1;

        return (
          <div key={page} className="flex items-center gap-2">
            {showEllipsis && (
              <span className="px-2 text-gray-600">…</span>
            )}
            <button
              onClick={() => onPageChange(page)}
              className={`${btnBase} ${currentPage === page ? btnActive : btnInactive}`}
              style={{
                background: currentPage === page
                  ? 'linear-gradient(135deg, #7c3aed, #6d28d9)'
                  : 'rgba(15, 23, 42, 0.6)',
              }}
              aria-label={`Page ${page}`}
              aria-current={currentPage === page ? 'page' : undefined}
            >
              {page}
            </button>
          </div>
        );
      })}

      {/* Next */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`${btnBase} ${btnInactive} disabled:opacity-30 disabled:cursor-not-allowed p-2`}
        style={{ background: 'rgba(15, 23, 42, 0.6)' }}
        aria-label="Next page"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}
