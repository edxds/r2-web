import { UserDto } from '../user/service';

export type PostDto = {
  id: number;
  content: string;
  authorId: number;
  communityId: number;
  parentPostId?: number;
  createdAt: string;
  author: UserDto;
  replies: PostDto[];
};