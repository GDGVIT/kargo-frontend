import React, { SelectHTMLAttributes, forwardRef } from "react";

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  className?: string;
  options: { value: string; label: string }[];
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, className = "", options, ...props }, ref) => (
    <div className="mb-4 w-full">
      {label && (
        <label className="block mb-1 text-sm font-medium text-[var(--foreground)]">
          {label}
        </label>
      )}
      <select
        ref={ref}
        className={`bg-[#293040] text-[var(--foreground)] w-full px-3 py-3 rounded border-2 border-[#7b8191] focus:border-[var(--theme-blue)] outline-none transition-colors duration-200 ${
          error ? "border-red-500" : ""
        } ${className} !min-h-[40px] !max-h-[40px]`}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  )
);
Select.displayName = "Select";

export default Select;
