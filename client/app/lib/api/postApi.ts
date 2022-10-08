import client from './client';
import { PostCreateRequest, PostCreateResponse } from './types';

export const createPost = async (data: PostCreateRequest) => {
  const response = await client.post<PostCreateResponse>('/api/v1/posts', data);
  return response.data;
};
