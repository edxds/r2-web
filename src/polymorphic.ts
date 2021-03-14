import { ElementType } from 'react';
import { PolymorphicComponentProps } from 'react-polymorphic-box';

export type PolymorphicComponent<P, D extends ElementType = 'div'> = (<
  E extends React.ElementType = D
>(
  props: PolymorphicComponentProps<E, P>,
) => JSX.Element | null) &
  React.ComponentType<P>;
