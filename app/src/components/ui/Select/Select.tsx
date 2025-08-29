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
import UserInput from "../UserInput/UserInput";

export interface SelectOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

export interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  label?: string;
  error?: string;
  placeholder?: string;
  className?: string;
  helperText?: React.ReactNode;
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
    <UserInput
      label={label}
      error={error}
      className={className}
      helperText={helperText}
      animationDuration={animationDuration}
      animationEasing={animationEasing}
      disabled={disabled}
      containerClassName="relative w-full"
    >
      <Listbox value={value} onChange={onChange} disabled={disabled}>
        {({ open }) => (
          <div className="relative w-full">
            <ListboxButton
              className={`flex items-center justify-between px-3 py-0 h-[44px] sm:h-[50px] w-full bg-[var(--in-bg)] border ${
                error ? "border-red-500" : "border-[#7B8191]"
              } rounded-[4px] text-left text-[15px] sm:text-[16px] font-inter focus:outline-none transition-all focus-visible:ring-2 focus-visible:ring-blue-400 ${
                disabled ? "opacity-60 pointer-events-none grayscale" : ""
              }`}
              aria-label={label}
              style={{ maxWidth: "-webkit-fill-available" }}
            >
              <span
                className={`flex items-center gap-2 ${
                  value ? "text-white" : "text-[#7B8191]"
                }`}
              >
                {value && options.find((opt) => opt.value === value)?.icon && (
                  <span className="flex items-center">
                    {options.find((opt) => opt.value === value)?.icon}
                  </span>
                )}
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
                  className="absolute z-50 mt-1 w-full"
                  style={{ maxWidth: "100vw" }}
                >
                  <ListboxOptions
                    className="bg-[#23283A] border border-[#7B8191] rounded-[4px] shadow-lg focus:outline-none text-[15px] sm:text-[16px] overflow-hidden"
                    style={{
                      maxHeight: options.length > 5 ? 220 : undefined,
                      overflowY: options.length > 5 ? "auto" : "visible",
                    }}
                  >
                    {options.map((opt, index) => {
                      const isFirst = index === 0;
                      const isLast = index === options.length - 1;
                      return (
                        <ListboxOption
                          key={opt.value}
                          value={opt.value}
                          className={({ active, selected }) =>
                            `relative cursor-pointer select-none py-2 pl-3 pr-10 text-[15px] sm:text-[16px] font-inter transition-colors duration-100
                            ${
                              active
                                ? "bg-[var(--in-bg)] text-white"
                                : selected
                                ? "text-white"
                                : "text-[#7B8191]"
                            }
                            ${selected ? "font-medium" : "font-normal"}
                            ${isFirst ? "rounded-t-[4px]" : ""}
                            ${isLast ? "rounded-b-[4px]" : ""}`
                          }
                        >
                          {({ selected }) => (
                            <div className="flex items-center justify-between w-full">
                              <div className="flex items-center gap-2">
                                {opt.icon && (
                                  <span className="flex items-center">
                                    {opt.icon}
                                  </span>
                                )}
                                <span>{opt.label}</span>
                              </div>
                              {selected && (
                                <span className="flex items-center text-white">
                                  <FiCheck className="w-4 h-4" />
                                </span>
                              )}
                            </div>
                          )}
                        </ListboxOption>
                      );
                    })}
                  </ListboxOptions>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </Listbox>
    </UserInput>
  );
};

export default Select;
