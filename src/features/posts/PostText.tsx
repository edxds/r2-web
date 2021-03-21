import clsx from 'clsx';
import { ComponentPropsWithoutRef, Fragment } from 'react';

export interface PostTextProps extends ComponentPropsWithoutRef<'p'> {
  content: string;
}

export function PostText({ content, className, ...props }: PostTextProps) {
  return (
    <p className={clsx('text-base text-gray-800', className)} {...props}>
      {content.split('\n').map((pieceOfText, key) => {
        return (
          <Fragment key={key}>
            {pieceOfText}
            <br />
          </Fragment>
        );
      })}
    </p>
  );
}
