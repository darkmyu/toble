import client from './client';
import { PostCreateRequest, PostCreateResponse, PostListResponse } from './types';

export const getPostList = async () => {
  const response = await client.get<PostListResponse[]>('/api/v1/posts');
  return response.data;
};

export const createPost = async (data: PostCreateRequest) => {
  const response = await client.post<PostCreateResponse>('/api/v1/posts', data);
  return response.data;
};
