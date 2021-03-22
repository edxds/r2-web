import { compareAsc, compareDesc, parseISO } from 'date-fns';

import { PostDto } from './dto';

export function sortPostsByDate(posts: PostDto[], order: 'asc' | 'desc' = 'desc'): PostDto[] {
  return posts.sort((a, b) => {
    return order === 'desc'
      ? compareDesc(parseISO(a.createdAt), parseISO(b.createdAt))
      : compareAsc(parseISO(a.createdAt), parseISO(b.createdAt));
  });
}
