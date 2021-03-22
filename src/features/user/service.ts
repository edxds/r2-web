import { CommunityDto } from '../community/service';
import { http } from '../network';

export type UserDto = {
  id: number;
  username: string;
  email: string;
  socialId?: string;
  needsSetup?: boolean;
};

export async function getUserInfo(): Promise<UserDto> {
  const res = await http.get<UserDto>('/users/whoami');
  return res.data;
}

export async function getJoinedCommunities() {
  const res = await http.get<CommunityDto[]>('/users/communities');
  return res.data;
}
