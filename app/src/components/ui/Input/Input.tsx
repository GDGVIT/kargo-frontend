import React, { InputHTMLAttributes, forwardRef } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  className?: string;
  icon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = "", icon, ...props }, ref) => (
    <div className="mb-4 w-full">
      {label && (
        <label className="block mb-1 text-sm font-medium text-[var(--foreground)]">
          {label}
        </label>
      )}
      <div className={`flex items-center ${icon ? "px-4 py-2 max-w-lg" : ""}`}>
        {icon && <span className="text-zinc-400 mr-4">{icon}</span>}
        <input
          ref={ref}
          className={`bg-[#293040] text-[var(--foreground)] w-full px-3 py-2 rounded border-2 border-[#7b8191] focus:border-[var(--theme-blue)] outline-none transition-colors duration-200 ${
            error ? "border-red-500" : ""
          } ${className} ${
            icon
              ? "bg-transparent outline-none text-white placeholder-zinc-500 text-lg"
              : ""
          }`}
          {...props}
        />
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  )
);
Input.displayName = "Input";
