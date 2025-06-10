import React, { TextareaHTMLAttributes, forwardRef } from "react";

export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  className?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className = "", ...props }, ref) => (
    <div className="mb-4 w-full max-w-[597px]">
      {label && (
        <label className="block mb-1 text-sm font-medium text-[var(--foreground)]">
          {label}
        </label>
      )}
      <div
        className={`flex flex-row items-start px-[2px] py-[10px] gap-[28px] w-[597px] bg-[#293040] border border-[#7B8191] rounded-[4px] box-border ${
          error ? "border-red-500" : ""
        }`}
      >
        <textarea
          ref={ref}
          className={`flex-1 bg-transparent outline-none text-[#7B8191] placeholder-zinc-500 text-[16px] leading-[19px] font-normal font-inter px-0 py-0 border-none ring-0 focus:ring-0 focus:outline-none resize-none ${className}`}
          style={{ border: "none", boxShadow: "none", minHeight: 40 }}
          {...props}
        />
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  )
);
Textarea.displayName = "Textarea";

export default Textarea;
