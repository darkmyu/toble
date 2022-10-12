import client from './client';
import { PageResponse, Post, PostCreateRequest, PostCreateResponse } from './types';

export const getPostList = async (page: number, size: number) => {
  const response = await client.get<PageResponse<Post>>('/api/v1/posts', {
    params: { page, size },
  });
  const { ...rest } = response.data;

  return { ...rest, nextPage: page + 1 };
};

export const createPost = async (data: PostCreateRequest) => {
  const response = await client.post<PostCreateResponse>('/api/v1/posts', data);
  return response.data;
};
