import clsx from 'clsx';
import { ComponentPropsWithoutRef } from 'react';

export interface TextFieldProps extends ComponentPropsWithoutRef<'input'> {}

export function TextField({ className, ...props }: TextFieldProps) {
  return (
    <input
      type="text"
      className={clsx(
        'text-base text-gray-800',
        'rounded-xl border-gray-300 outline-none',
        'focus:shadow-md focus:border-brand',
        'transition-all',
        className,
      )}
      {...props}
    />
  );
}
