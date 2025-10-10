import React, { forwardRef } from 'react';
import { motion, cubicBezier } from 'framer-motion';

export interface UserInputProps {
  label?: string;
  error?: string;
  className?: string;
  helperText?: React.ReactNode;
  animationDuration?: number;
  animationEasing?: number[];
  disabled?: boolean;
  children: React.ReactNode;
  containerClassName?: string;
}

const UserInput = forwardRef<HTMLDivElement, UserInputProps>(
  (
    {
      label,
      error,
      className = '',
      helperText,
      animationDuration = 0.5,
      animationEasing = [0.42, 0, 0.58, 1],
      disabled = false,
      children,
      containerClassName = '',
      ...props
    },
    ref
  ) => (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: animationDuration,
        ease: Array.isArray(animationEasing)
          ? cubicBezier(...(animationEasing as [number, number, number, number]))
          : animationEasing,
      }}
      className={`my-3 w-full max-w-full ${className}`}
      style={{ maxWidth: '-webkit-fill-available' }}
      ref={ref}
      {...props}
    >
      {label && (
        <label className="block mb-1 text-sm font-medium text-[var(--foreground)]">{label}</label>
      )}
      <div
        className={`w-full ${containerClassName} ${
          disabled ? 'opacity-60 pointer-events-none grayscale' : ''
        }`}
        style={{ maxWidth: '-webkit-fill-available' }}
      >
        {children}
      </div>
      {helperText && !error && <p className="text-xs mt-1 text-zinc-400">{helperText}</p>}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </motion.div>
  )
);
UserInput.displayName = 'UserInput';

export default UserInput;
