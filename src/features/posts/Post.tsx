/* eslint-disable import/no-duplicates */
import clsx from 'clsx';
import { ComponentPropsWithoutRef } from 'react';
import { MenuItem } from '@szhsin/react-menu';
import { motion } from 'framer-motion';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { DropdownMenu } from '@r2/components/DropdownMenu';

import { useUser } from '../user/hooks';

import { PostText } from './PostText';

export interface PostProps {
  author: string;
  authorId: number;
  createdAt: string;
  replyCount: number;
  content: string;
  isBeingDeleted?: boolean;
  onDelete?(): any;
}

export function Post({
  author,
  authorId,
  createdAt,
  replyCount,
  content,
  isBeingDeleted,
  onDelete,
}: PostProps) {
  const [user] = useUser({ dontRedirect: true });
  const isUserAuthor = user?.id === authorId;

  return (
    <motion.li
      layout="position"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className={clsx('flex flex-col bg-white py-4 px-6 space-y-2', isBeingDeleted && 'opacity-25')}
    >
      <section className="flex items-end justify-between">
        <PostAuthor author={author} />
        {isUserAuthor && (
          <DropdownMenu>
            <MenuItem onClick={onDelete} className="dropdown-menu-item">
              Apagar post
            </MenuItem>
          </DropdownMenu>
        )}
      </section>
      <PostText content={content} className="line-clamp-3" />
      <PostFooter timestamp={createdAt} replyCount={replyCount} />
    </motion.li>
  );
}

export interface PostAuthorProps extends ComponentPropsWithoutRef<'p'> {
  author: string;
}

export function PostAuthor({ author, className, ...props }: PostAuthorProps) {
  return (
    <p className={clsx(className, 'text-gray-800 text-sm')} {...props}>
      Por <span className="text-brand font-medium">@{author}</span>
    </p>
  );
}

export interface PostFooterProps {
  timestamp: string;
  replyCount: number;
}

export function PostFooter({ timestamp, replyCount }: PostFooterProps) {
  const replyString = () => {
    switch (replyCount) {
      case 0:
        return 'Nenhuma resposta';
      case 1:
        return '1 resposta';
      default:
        return `${replyCount} respostas`;
    }
  };

  return (
    <section className="flex items-center space-x-2 text-sm text-gray-800">
      <p>{formatDistanceToNow(parseISO(timestamp), { addSuffix: true, locale: ptBR })}</p>
      <span className="block text-gray-400">&bull;</span>
      <p>{replyString()}</p>
    </section>
  );
}
