import React from "react";

interface RepoPaginationProps {
  page: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
}

const RepoPagination: React.FC<RepoPaginationProps> = ({
  page,
  totalPages,
  onPrev,
  onNext,
}) => {
  if (totalPages <= 1) return null;
  return (
    <div className="flex justify-center mt-8 space-x-4">
      <button
        onClick={onPrev}
        disabled={page === 1}
        className="px-4 py-2 rounded bg-sky-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Previous
      </button>
      <span className="text-white pt-2">
        Page {page} of {totalPages}
      </span>
      <button
        onClick={onNext}
        disabled={page === totalPages}
        className="px-4 py-2 rounded bg-sky-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  );
};

export default RepoPagination;
