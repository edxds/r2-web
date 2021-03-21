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
