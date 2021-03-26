import { http } from '../network';

export function signIn({ username, password }: { username: string; password: string }) {
  return http.post('/auth/local', { username, password });
}

export type SignUpDto = {
  email: string;
  username: string;
  password: string;
};

export function signUp(dto: SignUpDto) {
  return http.post('/auth/register', dto);
}

export async function postRevoke(tokenId?: number) {
  return http.post('/auth/revoke', {}, { params: { token: tokenId } });
}
