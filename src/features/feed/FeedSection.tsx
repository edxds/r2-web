import clsx from 'clsx';
import { ComponentPropsWithoutRef } from 'react';

export interface FeedSectionProps extends Omit<ComponentPropsWithoutRef<'section'>, 'title'> {
  title: React.ReactNode;
}

export function FeedSection({ className, children, title, ...props }: FeedSectionProps) {
  return (
    <section className={clsx('-mx-6', className)} {...props}>
      <h3 className="text-sm text-gray-600 mx-6 mb-4">{title}</h3>
      <main className="bg-white md:rounded-xl border-t border-b border-gray-200 md:border">
        {children}
      </main>
    </section>
  );
}
