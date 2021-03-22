import { MenuItem } from '@szhsin/react-menu';
import { formatDistanceToNow, parseISO } from 'date-fns/esm';
import { ptBR } from 'date-fns/esm/locale';
import clsx from 'clsx';

import { DropdownMenu } from '@r2/components/DropdownMenu';

import { useUser } from '../user/hooks';

import { PostText } from './PostText';

export interface PostParentProps {
  author: string;
  authorId: number;
  communityName: string;
  createdAt: string;
  content: string;
  isBeingDeleted?: boolean;
  onDelete?(): any;
}

export function PostParent({
  author,
  authorId,
  communityName,
  createdAt,
  content,
  isBeingDeleted,
  onDelete,
}: PostParentProps) {
  const [user] = useUser({ dontRedirect: true });
  const isUserAuthor = user?.id === authorId;

  return (
    <div className={clsx('space-y-2', isBeingDeleted && 'opacity-25')}>
      <section className="flex items-end justify-between space-x-2">
        <p className="text-sm text-gray-500">
          Em <span className="text-brand">{communityName}</span> por{' '}
          <span className="text-brand">@{author}</span>{' '}
          {formatDistanceToNow(parseISO(createdAt), { addSuffix: true, locale: ptBR })}
        </p>
        {isUserAuthor && (
          <DropdownMenu>
            <MenuItem onClick={onDelete} className="dropdown-menu-item">
              Apagar post
            </MenuItem>
          </DropdownMenu>
        )}
      </section>
      <PostText content={content} />
    </div>
  );
}
