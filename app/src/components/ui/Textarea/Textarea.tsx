import React, { TextareaHTMLAttributes, forwardRef } from 'react';
import UserInput from '../UserInput/UserInput';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  className?: string;
  helperText?: React.ReactNode;
  animationDuration?: number;
  animationEasing?: number[];
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      error,
      className = '',
      helperText,
      disabled = false,
      animationDuration = 0.5,
      animationEasing = [0.42, 0, 0.58, 1],
      ...props
    },
    ref
  ) => (
    <UserInput
      label={label}
      error={error}
      className={className}
      helperText={helperText}
      animationDuration={animationDuration}
      animationEasing={animationEasing}
      disabled={disabled}
      containerClassName={`flex flex-row items-start px-[2px] py-2 h-auto w-full bg-[var(--in-bg)] border ${
        error ? 'border-red-500' : 'border-[#7B8191]'
      } rounded-[4px] box-border transition-all focus-within:ring-2 focus-within:ring-blue-400`}
    >
      <textarea
        ref={ref}
        className={`flex-1 bg-transparent outline-none text-[#7B8191] placeholder-zinc-500 text-[15px] sm:text-[16px] leading-[19px] font-normal font-inter px-0 py-0 border-none ring-0 focus:ring-0 focus:outline-none resize-y min-h-[40px] max-h-[300px]`}
        style={{
          border: 'none',
          boxShadow: 'none',
          minHeight: 40,
          maxHeight: 300,
          resize: 'vertical',
          minWidth: 0,
        }}
        disabled={disabled}
        aria-label={label}
        {...props}
      />
    </UserInput>
  )
);
Textarea.displayName = 'Textarea';

export default Textarea;
