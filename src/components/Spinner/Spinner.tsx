import clsx from 'clsx';
import { ComponentPropsWithoutRef } from 'react';
import { motion } from 'framer-motion';

import styles from './Spinner.module.css';

export function Spinner({ className, ...props }: ComponentPropsWithoutRef<typeof motion.div>) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className={clsx(className, styles.spinner)}
      {...props}
    />
  );
}
