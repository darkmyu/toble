import client from './client';
import { PostCreateRequest } from './types';

export const createPost = async (data: PostCreateRequest) => {
  return client.post('/api/v1/posts', data);
};
