import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { ComponentPropsWithRef, forwardRef } from 'react';
import { FieldError } from 'react-hook-form';

export interface TextFieldProps extends ComponentPropsWithRef<'input'> {
  label: React.ReactNode;
  helper?: React.ReactNode;
  hasError?: boolean;
  error?: FieldError;
  labelClass?: string;
  helperClass?: string;
  inputClass?: string;
  errorClass?: string;
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      label,
      helper,
      error,
      className,
      inputClass,
      labelClass,
      helperClass,
      errorClass,
      hasError,
      ...props
    },
    ref,
  ) => {
    return (
      <label className={clsx('flex flex-col space-y-2', className)}>
        <div className="space-y-1">
          <p className={clsx('text-base text-gray-800', labelClass)}>{label}</p>
          {helper && (
            <span className={clsx('block text-sm text-gray-600', helperClass)}>{helper}</span>
          )}
        </div>
        <input
          type="text"
          ref={ref}
          className={clsx(
            'text-base text-gray-800',
            'rounded-xl border-gray-300 outline-none',
            'focus:shadow-md focus:ring-1',
            'transition-all',
            (hasError || error) && 'border-red-600 focus:ring-red-600 focus:border-red-600',
            !hasError && !error && 'focus:border-brand focus:ring-brand',
            inputClass,
          )}
          {...props}
        />
        <AnimatePresence>
          {error?.message && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={clsx('text-sm text-red-600', errorClass)}
            >
              {error.message}
            </motion.p>
          )}
        </AnimatePresence>
      </label>
    );
  },
);

TextField.displayName = 'TextField';
