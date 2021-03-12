import clsx from 'clsx';
import { ElementType, forwardRef, ReactNode } from 'react';
import { Box, PolymorphicComponentProps } from 'react-polymorphic-box';

import { PolymorphicComponent } from '@r2/polymorphic';

export interface ButtonOwnProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'neutral';
  variant?: 'solid' | 'flat' | 'text';
  weight?: 'medium' | 'heavy';
  children?: ReactNode;
}

export type ButtonProps<E extends ElementType> = PolymorphicComponentProps<E, ButtonOwnProps>;

const defaultElement = 'button';

export const Button: PolymorphicComponent<ButtonOwnProps, typeof defaultElement> = forwardRef(
  <E extends React.ElementType = typeof defaultElement>(
    {
      size = 'md',
      color = 'neutral',
      variant = 'solid',
      weight = 'heavy',
      className,
      children,
      ...props
    }: ButtonProps<E>,
    ref: typeof props.ref,
  ) => {
    return (
      <Box
        as={defaultElement}
        ref={ref}
        className={clsx(className, 'flex items-center justify-center', 'disabled:opacity-25', {
          // Border radius
          'rounded-xl': size !== 'sm',
          'rounded-lg': size === 'sm',

          // Weight
          'font-black': weight === 'heavy',
          'font-medium': weight === 'medium',

          // Border and background "visibility"
          'bg-opacity-100 border-0': variant === 'solid' && color !== 'neutral',
          'bg-opacity-100 border': variant === 'solid' && color === 'neutral',
          'bg-opacity-0 border': variant === 'flat',
          'bg-opacity-0 border-0': variant === 'text',

          // Border and background colors
          'bg-brand border-brand': color === 'primary',
          'text-white': color === 'primary' && variant === 'solid',
          'text-brand': color === 'primary' && ['flat', 'text'].includes(variant),

          'bg-white text-gray-800': color === 'neutral',
          'border-gray-100': color === 'neutral' && variant === 'solid',
          'border-gray-400': color === 'neutral' && variant !== 'solid',

          // Dimensions
          'text-xs': size === 'sm',
          'text-sm': size === 'md',
          'text-lg': size === 'lg',
          'px-3 py-2 space-x-2': size === 'sm' && variant !== 'text',
          'px-6 py-3 space-x-3': ['md', 'lg'].includes(size) && variant !== 'text',
          'space-x-2': variant === 'text',

          // Depth
          shadow: variant === 'solid',
        })}
        {...props}
      >
        {children}
      </Box>
    );
  },
);
Button.displayName = 'Button';
