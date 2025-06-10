import React, { InputHTMLAttributes, forwardRef } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  className?: string;
  icon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = "", icon, type = "text", ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const isPassword = type === "password";
    return (
      <div className="mb-4 w-full max-w-full">
        {label && (
          <label className="block mb-1 text-sm font-medium text-[var(--foreground)]">
            {label}
          </label>
        )}
        <div
          className={`flex flex-row justify-between items-center px-[2px] py-[10px] w-full bg-[#293040] border border-[#7B8191] rounded-[4px] box-border ${
            error ? "border-red-500" : ""
          }`}
        >
          {icon && (
            <span className="text-zinc-400 mr-4 flex-none order-0 w-4 h-4 pl-2">
              {icon}
            </span>
          )}
          <input
            ref={ref}
            className={`flex-1 order-1 bg-transparent outline-none text-[#7B8191] placeholder-zinc-500 text-[16px] leading-[19px] font-normal font-inter px-0 py-0 border-none ring-0 focus:ring-0 focus:outline-none ${className} ${
              isPassword ? "pr-10" : ""
            }`}
            style={{ border: "none", boxShadow: "none" }}
            type={isPassword && showPassword ? "text" : type}
            {...props}
          />
          {isPassword && (
            <button
              type="button"
              aria-label={showPassword ? "Hide password" : "Show password"}
              onClick={() => setShowPassword((v) => !v)}
              className="ml-2 flex items-center justify-center text-zinc-400 focus:outline-none order-2 bg-transparent border-none p-0 cursor-pointer w-8 h-8"
              tabIndex={0}
              style={{ minWidth: 32 }}
            >
              {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
            </button>
          )}
        </div>
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      </div>
    );
  }
);
Input.displayName = "Input";

export default Input;
