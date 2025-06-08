import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import React, { ReactNode, MouseEventHandler } from "react";

interface AnimatedButtonProps {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  icon?: ReactNode;
  className?: string;
}

export const AnimatedButton = ({
  children,
  onClick,
  icon = <FaArrowRight />,
  className = "",
}: AnimatedButtonProps) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className={`flex items-center gap-2 px-4 py-2 rounded bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold shadow-md transition-colors duration-200 ${className}`}
    onClick={onClick}
  >
    {children}
    {icon}
  </motion.button>
);
