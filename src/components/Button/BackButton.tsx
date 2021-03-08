import { ElementType, forwardRef } from 'react';

import { ReactComponent as BackIcon } from '@r2/assets/icons/back.svg';

import { Button, ButtonProps } from './Button';

export interface BackButtonOwnProps {
  title?: string;
}

export type BackButtonProps<E extends ElementType> = BackButtonOwnProps & ButtonProps<E>;

const defaultElement = 'button';

export const BackButton: <E extends ElementType = typeof defaultElement>(
  props: BackButtonProps<E>,
) => JSX.Element | null = forwardRef(
  <E extends ElementType = typeof defaultElement>(
    {
      title = 'Voltar',
      size = 'md',
      color = 'primary',
      variant = 'text',
      weight = 'medium',
      children,
      ...props
    }: BackButtonProps<E>,
    ref: typeof props.ref,
  ) => (
    <Button ref={ref} size={size} color={color} variant={variant} weight={weight} {...props}>
      <BackIcon className="fill-current icon" />
      <span>{title}</span>
    </Button>
  ),
);
