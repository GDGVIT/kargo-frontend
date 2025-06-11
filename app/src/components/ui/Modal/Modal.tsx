import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
  showCloseButton?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  title,
  children,
  className = "",
  showCloseButton = true,
}) => {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--background)]/70 backdrop-blur-[3px] px-2 sm:px-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className={clsx(
              "bg-[var(--card-background)] rounded-2xl shadow-2xl border border-[var(--foreground)]/10 p-4 sm:p-8 w-full max-w-[95vw] sm:max-w-lg relative flex flex-col max-h-[90vh] overflow-y-auto",
              className
            )}
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.92, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 22,
              duration: 0.28,
            }}
            role="dialog"
            aria-modal="true"
          >
            {showCloseButton && (
              <button
                onClick={onClose}
                className="absolute top-2 right-2 sm:top-4 sm:right-4 text-zinc-400 hover:text-white focus:outline-none rounded-full p-1 transition-all duration-200 focus:ring-2 focus:ring-[var(--text-link-color)] hover:bg-[var(--background)]/30 hover:scale-110"
                aria-label="Close modal"
              >
                <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
                  <path
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M18 6L6 18M6 6l12 12"
                  />
                </svg>
              </button>
            )}
            {title && (
              <h2 className="text-lg sm:text-xl font-bold text-[var(--foreground)] mb-3 sm:mb-5 tracking-tight drop-shadow-sm">
                {title}
              </h2>
            )}
            <div className="text-[var(--foreground)]">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
