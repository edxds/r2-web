import { http } from '../network';

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
