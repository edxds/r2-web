import { ElementType, forwardRef } from 'react';
import { PolymorphicComponentProps } from 'react-polymorphic-box';

import { ReactComponent as BackIcon } from '@r2/assets/icons/back.svg';
import { PolymorphicComponent } from '@r2/polymorphic';

import { Button, ButtonOwnProps } from './Button';

export interface BackButtonOwnProps extends ButtonOwnProps {
  title?: string;
}

export type BackButtonProps<
  E extends ElementType = typeof defaultElement
> = PolymorphicComponentProps<E, BackButtonOwnProps>;

const defaultElement = 'button';

export const BackButton: PolymorphicComponent<
  BackButtonOwnProps,
  typeof defaultElement
> = forwardRef(
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
BackButton.displayName = 'BackButton';
