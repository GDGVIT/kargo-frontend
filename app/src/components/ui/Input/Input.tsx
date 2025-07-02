import React, {
  InputHTMLAttributes,
  forwardRef,
  useMemo,
  useState,
} from "react";
import { motion } from "framer-motion";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Select from "../Select/Select";

export type UnitType = "cpu" | "memory" | "storage";

const unitConfigs = {
  cpu: {
    units: ["m", "vCPU"],
    convertToBase: (value: number, unit: string) =>
      unit === "vCPU" ? value * 1000 : value,
    convertFromBase: (base: number, unit: string) =>
      unit === "vCPU" ? base / 1000 : base,
    format: (val: number, unit: string) =>
      unit === "vCPU" ? `${(val / 1000).toFixed(2)} vCPU` : `${val} m`,
    defaultUnit: "m",
  },
  memory: {
    units: ["MB", "GB"],
    convertToBase: (value: number, unit: string) =>
      unit === "GB" ? value * 1024 : value,
    convertFromBase: (base: number, unit: string) =>
      unit === "GB" ? base / 1024 : base,
    format: (val: number, unit: string) =>
      unit === "GB" ? `${(val / 1024).toFixed(2)} GB` : `${val} MB`,
    defaultUnit: "MB",
  },
  storage: {
    units: ["GB", "TB"],
    convertToBase: (value: number, unit: string) =>
      unit === "TB" ? value * 1024 : value,
    convertFromBase: (base: number, unit: string) =>
      unit === "TB" ? base / 1024 : base,
    format: (val: number, unit: string) =>
      unit === "TB" ? `${(val / 1024).toFixed(2)} TB` : `${val} GB`,
    defaultUnit: "GB",
  },
};

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange" | "value"> {
  label?: string;
  error?: string;
  className?: string;
  icon?: React.ReactNode;
  helperText?: React.ReactNode;
  animationDuration?: number;
  animationEasing?: number[];
  unitType?: UnitType;
  value: string;
  onChange: (baseValue: string) => void;
  displayHelperText?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      className = "",
      icon,
      type = "text",
      disabled = false,
      animationDuration = 0.5,
      animationEasing = [0.42, 0, 0.58, 1],
      unitType,
      value,
      onChange,
      displayHelperText = false,
      helperText,
      ...props
    },
    ref
  ) => {
    const isPassword = type === "password";
    const [showPassword, setShowPassword] = useState(false);
    const [unit, setUnit] = useState(
      unitType ? unitConfigs[unitType].defaultUnit : undefined
    );

    const displayValue = useMemo(() => {
      if (!unitType || typeof value !== "string") return value;
      const numeric = Number(value);
      if (isNaN(numeric)) return "";
      return unitConfigs[unitType].convertFromBase(numeric, unit!).toString();
    }, [value, unitType, unit]);

    const helper = useMemo(() => {
      if (!displayHelperText || !unitType || !value) return null;
      const numeric = Number(value);
      if (isNaN(numeric)) return null;
      return unitConfigs[unitType].format(numeric, unit!);
    }, [displayHelperText, unitType, value, unit]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (unitType) {
        // Allow empty input for clearing the field
        if (e.target.value === "") {
          onChange("");
          return;
        }
        const inputValue = Number(e.target.value);
        if (isNaN(inputValue)) {
          // Optionally, allow partial input (like '1.')
          onChange(e.target.value);
          return;
        }
        const base = unitConfigs[unitType].convertToBase(inputValue, unit!);
        onChange(String(base));
      } else {
        onChange(e.target.value);
      }
    };

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
            value={displayValue}
            onChange={handleChange}
            {...props}
          />
          {unitType && unit && (
            <div className="flex items-center ml-2 order-2">
              <Select
                value={unit}
                onChange={setUnit}
                options={unitConfigs[unitType].units.map((u) => ({
                  value: u,
                  label: u,
                }))}
                disabled={disabled}
                className="!my-0 !mx-0 min-w-[60px] w-auto"
                placeholder="Unit"
                animationDuration={0.2}
                animationEasing={[0.42, 0, 0.58, 1]}
              />
            </div>
          )}
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
        {helper && !error && (
          <p className="text-xs mt-1 text-zinc-400">{helper}</p>
        )}
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      </motion.div>
    );
  }
);

Input.displayName = "Input";
export default Input;
