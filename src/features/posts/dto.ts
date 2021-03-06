import { CommunityDto } from '../community/service';
import { UserDto } from '../user/service';

export type PostDto = {
  id: number;
  content: string;
  authorId: number;
  communityId: number;
  parentPostId?: number;
  createdAt: string;
  author: UserDto;
  community?: CommunityDto;
  replies: PostDto[];
};

export type CreatePostDto = {
  content: string;
  communityId: number;
  parentPostId?: number;
};
