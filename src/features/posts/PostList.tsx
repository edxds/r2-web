import { ComponentPropsWithoutRef } from 'react';
import clsx from 'clsx';

export interface PostListProps extends ComponentPropsWithoutRef<'div'> {}

export function PostList({ children, className, ...props }: PostListProps) {
  return (
    <div
      className={clsx(
        className,
        'divide-gray-200 divide-y border-t border-b',
        'md:rounded-xl md:border-gray-200 md:border overflow-hidden',
      )}
      {...props}
    >
      {children}
    </div>
  );
}
