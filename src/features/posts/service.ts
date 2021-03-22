import { http } from '../network';

import { CreatePostDto, PostDto } from './dto';

export async function getPost(id: number) {
  const res = await http.get<PostDto>(`/post/${id}`);
  return res.data;
}

export async function createPost(dto: CreatePostDto) {
  const res = await http.post<PostDto>('/post', dto);
  return res.data;
}

export async function deletePost(postId: number) {
  const res = await http.delete<PostDto>(`/post/${postId}`);
  return res.data;
}
