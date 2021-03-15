import clsx from 'clsx';
import { ComponentPropsWithRef, forwardRef } from 'react';

import styles from './Checkbox.module.css';

export interface CheckboxProps extends ComponentPropsWithRef<'input'> {}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, ...props }, ref) => {
    return (
      <input type="checkbox" ref={ref} className={clsx(styles.checkbox, className)} {...props} />
    );
  },
);

Checkbox.displayName = 'Checkbox';
