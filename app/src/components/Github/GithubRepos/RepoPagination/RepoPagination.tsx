import React from "react";
import { motion } from "framer-motion";

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
}) => (
  <motion.div
    className="flex flex-col sm:flex-row justify-center items-center mt-4 gap-3 sm:gap-8 w-full"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
  >
    <motion.button
      className="w-full sm:w-auto px-5 py-2 rounded-lg bg-neutral-800 text-white disabled:opacity-50 border border-neutral-700 shadow-md transition-colors duration-200"
      onClick={onPrev}
      disabled={page === 1}
      aria-label="Previous page"
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.07, backgroundColor: "#0ea5e9" }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      Previous
    </motion.button>
    <span
      className="text-zinc-300 font-semibold tracking-wide w-full sm:w-auto text-center text-base sm:text-lg px-2 sm:px-6 py-1 rounded bg-neutral-900/70 shadow"
      aria-live="polite"
      aria-atomic="true"
    >
      Page {page} of {totalPages}
    </span>
    <motion.button
      className="w-full sm:w-auto px-5 py-2 rounded-lg bg-neutral-800 text-white disabled:opacity-50 border border-neutral-700 shadow-md transition-colors duration-200"
      onClick={onNext}
      disabled={page === totalPages || totalPages === 0}
      aria-label="Next page"
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.07, backgroundColor: "#0ea5e9" }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      Next
    </motion.button>
  </motion.div>
);

export default RepoPagination;
