"use client";

import { motion } from "framer-motion";
import React, { ReactNode, MouseEventHandler } from "react";

interface AnimatedButtonProps {
  children?: React.ReactNode;
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
      className={`flex flex-row justify-center items-center ${
        children
          ? "gap-2 sm:gap-[10px] px-4 sm:px-6"
          : "aspect-square w-[44px] h-[44px] p-0 px-0" // square for icon-only, remove x padding
      } mx-2 my-3 py-2 sm:py-2 max-w-full rounded-[8px] font-inter font-medium text-[15px] sm:text-[16px] leading-[19px] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 ${
        disabled ? "opacity-60 cursor-not-allowed" : ""
      } ${variantClass} ${className}`}
      onClick={disabled ? undefined : onClick}
      tabIndex={0}
      disabled={disabled}
      title={title}
      type={type}
    >
      {/* Only render the text span if children exist */}
      {children && (
        <span
          className="flex items-center justify-center h-[19px] truncate text-center w-full"
          style={{ order: icon ? 0 : 1, flex: icon ? "1 1 0%" : "1 1 0%" }}
        >
          {children}
        </span>
      )}
      {/* Only render the icon span if icon exists */}
      {icon && (
        <span
          className={`flex items-center justify-center h-6 w-6 text-center flex-shrink-0 ${
            !children ? "w-full h-full" : ""
          }`}
          style={{
            order: children ? 2 : 0,
            flex: children ? "none" : "1 1 0%",
            flexGrow: children ? 0 : 1,
          }}
        >
          {icon}
        </span>
      )}
    </motion.button>
  );
};

export default AnimatedButton;
