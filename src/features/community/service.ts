import { http } from '../network';
import { PostDto } from '../posts/dto';
import { UserDto } from '../user/service';

export type CreateCommunityDto = {
  code: string;
  title: string;
  desc?: string;
  avatar?: string;
  isPrivate?: boolean;
};

export function createCommunity(dto: CreateCommunityDto) {
  return http.post('/community', dto);
}

export type GetAllCommunitiesDto = Array<{
  id: number;
  code: string;
  title: string;
  desc?: string;
  avatar?: string;
  isPrivate: boolean;
}>;

export function getAllCommunities() {
  return http.get<GetAllCommunitiesDto>('/community');
}

export type CommunityDto = {
  id: number;
  code: string;
  title: string;
  desc: string;
  avatar?: string;
  isPrivate?: boolean;
  members: UserDto[];
  posts: PostDto[];
};

export async function getCommunity(id: number) {
  const res = await http.get<CommunityDto>(`/community/${id}`, {
    params: {
      includeMembers: true,
      includePosts: true,
    },
  });

  return res.data;
}
