"use client";

import React, { useRef, ReactNode, KeyboardEvent } from "react";
import { motion } from "framer-motion";

interface CardProps {
  children: ReactNode;
  className?: string;
  hoverable?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  animationDuration?: number;
  animationEasing?: number[];
  elevation?: 1 | 2 | 3 | 4 | 5;
  "aria-label"?: string;
}

const elevationMap = {
  1: "shadow-md",
  2: "shadow-lg",
  3: "shadow-xl",
  4: "shadow-2xl",
  5: "shadow-3xl",
};

const Card = ({
  children,
  className = "",
  hoverable = false,
  onClick,
  disabled = false,
  animationDuration = 0.7,
  animationEasing = [0.42, 0, 0.58, 1],
  elevation = 2,
  "aria-label": ariaLabel,
}: CardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  // Keyboard accessibility for clickable cards
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (disabled) return;
    if (onClick && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: animationDuration, ease: animationEasing }}
      className={`mx-2 my-3 bg-[var(--card-background)] rounded-lg p-4 sm:p-6 transition-all outline-none focus-visible:ring-2 focus-visible:ring-blue-400 ${
        elevationMap[elevation] || "shadow-lg"
      } ${
        hoverable && !disabled ? "hover:shadow-2xl hover:-translate-y-1" : ""
      } ${onClick && !disabled ? "cursor-pointer active:scale-[0.98]" : ""} ${
        disabled ? "opacity-60 pointer-events-none grayscale" : ""
      } ${className} w-full max-w-full sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl 2xl:max-w-3xl`}
      onClick={disabled ? undefined : onClick}
      tabIndex={onClick && !disabled ? 0 : undefined}
      role={onClick && !disabled ? "button" : undefined}
      aria-label={ariaLabel}
      style={{ outline: "none", maxWidth: "-webkit-fill-available" }}
      onKeyDown={handleKeyDown}
    >
      {children}
    </motion.div>
  );
};

export default Card;
