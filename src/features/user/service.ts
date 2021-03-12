import { http } from '../network';

export async function getUserInfo() {
  const res = await http.get('/users/whoami');
  return res.data;
}
