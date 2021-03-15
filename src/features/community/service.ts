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
