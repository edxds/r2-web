import { ComponentPropsWithoutRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import clsx from 'clsx';

export interface PostListProps extends ComponentPropsWithoutRef<typeof motion.ul> {}

export function PostList({ children, className, ...props }: PostListProps) {
  return (
    <motion.ul
      className={clsx(
        className,
        'divide-gray-200 divide-y border-t border-b',
        'md:rounded-xl md:border-gray-200 md:border overflow-hidden',
      )}
      {...props}
    >
      <AnimatePresence initial={false}>{children}</AnimatePresence>
    </motion.ul>
  );
}
