import { http } from '../network';

export function signIn({ username, password }: { username: string; password: string }) {
  return http.post('/auth/local', { username, password });
}
