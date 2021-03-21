import { http } from '../network';
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
};

export async function getCommunity(id: number) {
  const res = await http.get<CommunityDto>(`/community/${id}?includeMembers=true`);
  return res.data;
}
