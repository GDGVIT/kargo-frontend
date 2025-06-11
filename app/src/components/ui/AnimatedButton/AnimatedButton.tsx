"use client";

import { motion } from "framer-motion";
import React, { ReactNode, MouseEventHandler } from "react";

interface AnimatedButtonProps {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  icon?: ReactNode;
  className?: string;
  disabled?: boolean;
  title?: string;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "danger" | "secondary" | "success" | "warning";
}

const AnimatedButton = ({
  children,
  onClick,
  icon = "",
  className = "",
  disabled = false,
  title,
  type = "button",
  variant = "primary",
}: AnimatedButtonProps) => {
  let variantClass = "";
  let initialBgColor = "";
  switch (variant) {
    case "danger":
      variantClass = "bg-red-600 hover:bg-red-700 text-white";
      initialBgColor = "#dc2626";
      break;
    case "secondary":
      variantClass = "bg-gray-700 hover:bg-gray-800 text-white";
      initialBgColor = "#374151";
      break;
    case "success":
      variantClass = "bg-green-600 hover:bg-green-700 text-white";
      initialBgColor = "#16a34a";
      break;
    case "warning":
      variantClass = "bg-yellow-500 hover:bg-yellow-600 text-black";
      initialBgColor = "#eab308";
      break;
    default:
      variantClass = "bg-[#2FA2A0] hover:bg-[#27918F] text-white";
      initialBgColor = "#2FA2A0";
  }
  return (
    <motion.button
      style={{ backgroundColor: initialBgColor }}
      whileHover={
        disabled
          ? {}
          : {
              scale: 1.02, // reduced from 1.05
              boxShadow: "0 4px 16px rgba(47,162,160,0.15)",
              backgroundColor:
                variant === "danger"
                  ? "#dc2626"
                  : variant === "success"
                  ? "#16a34a"
                  : variant === "warning"
                  ? "#eab308"
                  : variant === "secondary"
                  ? "#374151"
                  : "#27918F",
            }
      }
      whileTap={
        disabled
          ? {}
          : {
              scale: 0.97,
              backgroundColor:
                variant === "danger"
                  ? "#b91c1c"
                  : variant === "success"
                  ? "#15803d"
                  : variant === "warning"
                  ? "#ca8a04"
                  : variant === "secondary"
                  ? "#1f2937"
                  : "#258C8A",
            }
      }
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className={`flex flex-row justify-center items-center gap-2 sm:gap-[10px] mx-2 my-3 px-3 sm:px-[16px] py-2 sm:py-[10px] min-w-[100px] sm:min-w-[120px] max-w-full h-[40px] sm:h-[44px] rounded-[8px] font-inter font-medium text-[15px] sm:text-[16px] leading-[19px] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 ${
        disabled ? "opacity-60 cursor-not-allowed" : ""
      } ${variantClass} ${className}`}
      onClick={disabled ? undefined : onClick}
      tabIndex={0}
      disabled={disabled}
      title={title}
      type={type}
    >
      <span
        className="flex items-center justify-center min-w-[54px] h-[19px] truncate"
        style={{ order: 0, flex: "none", flexGrow: 0 }}
      >
        {children}
      </span>
      <span
        className="flex items-center"
        style={{ order: 2, flex: "none", flexGrow: 0 }}
      >
        {icon}
      </span>
    </motion.button>
  );
};

export default AnimatedButton;
