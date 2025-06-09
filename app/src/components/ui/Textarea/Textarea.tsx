import React, { TextareaHTMLAttributes, forwardRef } from "react";

export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  className?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className = "", ...props }, ref) => (
    <div className="mb-4 w-full">
      {label && (
        <label className="block mb-1 text-sm font-medium text-[var(--foreground)]">
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        className={`bg-[#293040] text-[var(--foreground)] w-full px-3 py-3 rounded border-2 border-[#7b8191] focus:border-[var(--theme-blue)] outline-none transition-colors duration-200 resize-none ${
          error ? "border-red-500" : ""
        } ${className} !min-h-[40px]`}
        {...props}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  )
);
Textarea.displayName = "Textarea";

export default Textarea;
