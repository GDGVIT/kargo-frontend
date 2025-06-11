"use client";

import React from "react";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronDown, FiCheck } from "react-icons/fi";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  label?: string;
  error?: string;
  placeholder?: string;
  className?: string;
  helperText?: string;
  disabled?: boolean;
  animationDuration?: number;
  animationEasing?: number[];
}

const Select: React.FC<SelectProps> = ({
  value,
  onChange,
  options,
  label,
  error,
  placeholder = "Select an option",
  className = "",
  helperText,
  disabled = false,
  animationDuration = 0.5,
  animationEasing = [0.42, 0, 0.58, 1],
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: animationDuration, ease: animationEasing }}
      className={`mx-2 my-3 w-full max-w-full ${className}`}
      style={{ maxWidth: "-webkit-fill-available" }}
    >
      {label && (
        <label className="block mb-1 text-sm font-medium text-[var(--foreground)]">
          {label}
        </label>
      )}
      <Listbox value={value} onChange={onChange} disabled={disabled}>
        {({ open }) => (
          <div className="relative w-full" style={{ maxWidth: "100vw" }}>
            <ListboxButton
              className={`flex items-center justify-between px-3 py-0 h-[44px] sm:h-[50px] w-full bg-[#293040] border ${
                error ? "border-red-500" : "border-[#7B8191]"
              } rounded-[4px] text-left text-[15px] sm:text-[16px] font-inter focus:outline-none transition-all focus-visible:ring-2 focus-visible:ring-blue-400 ${
                disabled ? "opacity-60 pointer-events-none grayscale" : ""
              }`}
              aria-label={label}
              style={{ maxWidth: "-webkit-fill-available" }}
            >
              <span className={`${value ? "text-white" : "text-[#7B8191]"}`}>
                {options.find((opt) => opt.value === value)?.label || (
                  <span className="text-zinc-500">{placeholder}</span>
                )}
              </span>
              <FiChevronDown className="w-4 h-4 text-white ml-2 pointer-events-none" />
            </ListboxButton>

            <AnimatePresence>
              {open && !disabled && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.15 }}
                  className="absolute z-50 mt-1 w-full overflow-visible"
                  style={{ maxWidth: "100vw" }}
                >
                  <ListboxOptions className="bg-[#23283A] border border-[#7B8191] rounded-[4px] shadow-lg max-h-60 overflow-auto focus:outline-none text-[15px] sm:text-[16px]">
                    {options.map((opt) => (
                      <ListboxOption
                        key={opt.value}
                        value={opt.value}
                        className={({ active, selected }) =>
                          `relative cursor-pointer select-none py-2 pl-3 pr-10 text-[15px] sm:text-[16px] font-inter transition-colors ${
                            active
                              ? "bg-[#293040] text-white"
                              : selected
                              ? "text-white"
                              : "text-[#7B8191]"
                          } ${selected ? "font-medium" : "font-normal"}`
                        }
                      >
                        {({ selected }) => (
                          <>
                            <span>{opt.label}</span>
                            {selected && (
                              <span className="absolute inset-y-0 right-3 flex items-center text-white">
                                <FiCheck className="w-4 h-4" />
                              </span>
                            )}
                          </>
                        )}
                      </ListboxOption>
                    ))}
                  </ListboxOptions>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </Listbox>
      {helperText && !error && (
        <p className="text-xs mt-1 text-zinc-400">{helperText}</p>
      )}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </motion.div>
  );
};

export default Select;
