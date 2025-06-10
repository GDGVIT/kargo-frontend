"use client";

import React from "react";
import { Listbox } from "@headlessui/react";
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
}

const Select: React.FC<SelectProps> = ({
  value,
  onChange,
  options,
  label,
  error,
  placeholder = "Select an option",
  className = "",
}) => {
  return (
    <div className={`mb-4 w-full max-w-[597px] ${className}`}>
      {label && (
        <label className="block mb-1 text-sm font-medium text-[var(--foreground)]">
          {label}
        </label>
      )}
      <Listbox value={value} onChange={onChange}>
        {({ open }) => (
          <div className="relative w-full">
            <Listbox.Button
              className={`flex items-center justify-between px-3 py-2 w-full h-[41px] bg-[#293040] border ${
                error ? "border-red-500" : "border-[#7B8191]"
              } rounded-[4px] text-left text-[16px] font-inter focus:outline-none`}
            >
              <span className={`${value ? "text-white" : "text-[#7B8191]"}`}>
                {options.find((opt) => opt.value === value)?.label || (
                  <span className="text-zinc-500">{placeholder}</span>
                )}
              </span>
              <FiChevronDown className="w-4 h-4 text-white ml-2 pointer-events-none" />
            </Listbox.Button>

            <AnimatePresence>
              {open && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.15 }}
                  className="absolute z-50 mt-1 w-full overflow-visible"
                >
                  <Listbox.Options className="bg-[#23283A] border border-[#7B8191] rounded-[4px] shadow-lg max-h-60 overflow-auto focus:outline-none">
                    {options.map((opt) => (
                      <Listbox.Option
                        key={opt.value}
                        value={opt.value}
                        className={({ active, selected }) =>
                          `relative cursor-pointer select-none py-2 pl-4 pr-10 text-[16px] font-inter transition-colors ${
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
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </Listbox>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default Select;
