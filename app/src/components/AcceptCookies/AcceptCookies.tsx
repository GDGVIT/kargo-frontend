"use client";

import React, { useState, useEffect } from "react";
import { MdCookie } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";

const AcceptCookies: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem("cookieAccepted");
    if (!accepted) setVisible(true);
  }, []);

  const handleClose = () => {
    localStorage.setItem("cookieAccepted", "true");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          className="fixed bottom-6 left-1/2 transform -translate-x-1/2 w-full max-w-4xl bg-gray-850/95 backdrop-blur-sm rounded-full px-8 py-4 flex items-center justify-between gap-6 shadow-lg border border-gray-700 text-gray-300 z-50"
        >
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <MdCookie
              className="w-6 h-6 flex-shrink-0 text-yellow-400"
              aria-hidden="true"
            />
            <p className="text-sm text-gray-300 truncate">
              This website uses cookies to ensure you get the best experience.
            </p>
          </div>
          <div className="flex gap-4 flex-shrink-0">
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-300 text-sm underline"
              aria-label="Close cookie consent"
            >
              Close
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AcceptCookies;
