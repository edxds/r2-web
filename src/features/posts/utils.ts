import { compareDesc, parseISO } from 'date-fns';

import { PostDto } from './dto';

export function sortPostsByDate(posts: PostDto[]): PostDto[] {
  return posts.sort((a, b) => {
    return compareDesc(parseISO(a.createdAt), parseISO(b.createdAt));
  });
}
