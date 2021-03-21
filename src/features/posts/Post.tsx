/* eslint-disable import/no-duplicates */
import clsx from 'clsx';
import { ComponentPropsWithoutRef } from 'react';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export interface PostProps {
  author: string;
  createdAt: string;
  replyCount: number;
  content: string;
}

export function Post({ author, createdAt, replyCount, content }: PostProps) {
  return (
    <div className="flex flex-col bg-white py-4 px-6 space-y-2">
      <PostAuthor author={author} />
      <p className="text-base text-gray-800 line-clamp-3">{content}</p>
      <PostFooter timestamp={createdAt} replyCount={replyCount} />
    </div>
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
