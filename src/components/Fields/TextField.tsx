import clsx from 'clsx';
import { ComponentPropsWithoutRef } from 'react';

export interface TextFieldProps extends ComponentPropsWithoutRef<'input'> {
  hasError?: boolean;
}

export function TextField({ className, hasError, ...props }: TextFieldProps) {
  return (
    <input
      type="text"
      className={clsx(
        'text-base text-gray-800',
        'rounded-xl border-gray-300 outline-none',
        'focus:shadow-md focus:ring-1',
        'transition-all',
        hasError && 'border-red-600 focus:ring-red-600 focus:border-red-600',
        !hasError && 'focus:border-brand focus:ring-brand',
        className,
      )}
      {...props}
    />
  );
}
