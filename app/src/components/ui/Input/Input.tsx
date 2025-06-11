import React, { InputHTMLAttributes, forwardRef } from "react";
import { motion } from "framer-motion";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  className?: string;
  icon?: React.ReactNode;
  helperText?: string;
  animationDuration?: number;
  animationEasing?: number[];
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      className = "",
      icon,
      type = "text",
      helperText,
      disabled = false,
      animationDuration = 0.5,
      animationEasing = [0.42, 0, 0.58, 1],
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const isPassword = type === "password";
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: animationDuration, ease: animationEasing }}
        className={`m-2 sm:m-3 w-full max-w-full ${className}`}
        style={{ maxWidth: "-webkit-fill-available" }}
      >
        {label && (
          <label className="block mb-1 text-sm font-medium text-[var(--foreground)]">
            {label}
          </label>
        )}
        <div
          className={`flex flex-row justify-between items-center px-[2px] py-0 h-[44px] sm:h-[50px] w-full bg-[#293040] border ${
            error ? "border-red-500" : "border-[#7B8191]"
          } rounded-[4px] box-border transition-all focus-within:ring-2 focus-within:ring-blue-400 ${
            disabled ? "opacity-60 pointer-events-none grayscale" : ""
          }`}
          style={{ maxWidth: "-webkit-fill-available" }}
        >
          {icon && (
            <span className="text-zinc-400 mr-2 sm:mr-4 flex-none order-0 w-4 h-4 pl-2">
              {icon}
            </span>
          )}
          <input
            ref={ref}
            className={`flex-1 order-1 bg-transparent outline-none text-[#7B8191] placeholder-zinc-500 text-[15px] sm:text-[16px] leading-[19px] font-normal font-inter px-0 py-0 border-none ring-0 focus:ring-0 focus:outline-none ${
              isPassword ? "pr-10" : ""
            }`}
            style={{ border: "none", boxShadow: "none", minWidth: 0 }}
            type={isPassword && showPassword ? "text" : type}
            disabled={disabled}
            aria-label={label}
            {...props}
          />
          {isPassword && (
            <button
              type="button"
              aria-label={showPassword ? "Hide password" : "Show password"}
              onClick={() => setShowPassword((v) => !v)}
              className="ml-1 sm:ml-2 pr-1 flex items-center justify-center text-zinc-400 focus:outline-none order-2 bg-transparent border-none p-0 cursor-pointer w-8"
              tabIndex={0}
              style={{ minWidth: 32 }}
              disabled={disabled}
            >
              {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
            </button>
          )}
        </div>
        {helperText && !error && (
          <p className="text-xs mt-1 text-zinc-400">{helperText}</p>
        )}
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      </motion.div>
    );
  }
);
Input.displayName = "Input";

export default Input;
