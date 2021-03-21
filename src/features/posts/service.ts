import { http } from '../network';

import { CreatePostDto, PostDto } from './dto';

export async function createPost(dto: CreatePostDto) {
  const res = await http.post<PostDto>('/post', dto);
  return res.data;
}

export async function deletePost(postId: number) {
  const res = await http.delete(`/post/${postId}`);
  return res.data;
}
