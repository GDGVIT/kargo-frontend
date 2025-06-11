import React, { TextareaHTMLAttributes, forwardRef } from "react";
import { motion } from "framer-motion";

export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  className?: string;
  helperText?: string;
  animationDuration?: number;
  animationEasing?: number[];
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      error,
      className = "",
      helperText,
      disabled = false,
      animationDuration = 0.5,
      animationEasing = [0.42, 0, 0.58, 1],
      ...props
    },
    ref
  ) => (
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
      <div
        className={`flex flex-row items-start px-[2px] py-2 h-auto w-full bg-[#293040] border ${
          error ? "border-red-500" : "border-[#7B8191]"
        } rounded-[4px] box-border transition-all focus-within:ring-2 focus-within:ring-blue-400 ${
          disabled ? "opacity-60 pointer-events-none grayscale" : ""
        }`}
        style={{ maxWidth: "-webkit-fill-available" }}
      >
        <textarea
          ref={ref}
          className={`flex-1 bg-transparent outline-none text-[#7B8191] placeholder-zinc-500 text-[15px] sm:text-[16px] leading-[19px] font-normal font-inter px-0 py-0 border-none ring-0 focus:ring-0 focus:outline-none resize-y min-h-[40px] max-h-[300px]`}
          style={{
            border: "none",
            boxShadow: "none",
            minHeight: 40,
            maxHeight: 300,
            resize: "vertical",
            minWidth: 0,
          }}
          disabled={disabled}
          aria-label={label}
          {...props}
        />
      </div>
      {helperText && !error && (
        <p className="text-xs mt-1 text-zinc-400">{helperText}</p>
      )}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </motion.div>
  )
);
Textarea.displayName = "Textarea";

export default Textarea;
