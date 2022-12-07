import client from './client';
import { PageResponse, Post, PostAndComment, PostCreateRequest, PostCreateResponse } from './types';

export const getPost = async (id: number) => {
  const response = await client.get<PostAndComment>(`/api/v1/posts/${id}`);
  return response.data;
};

export const getPostList = async (page: number, size: number) => {
  const response = await client.get<PageResponse<Post>>('/api/v1/posts', {
    params: { page, size },
  });

  return { ...response.data, nextPage: page + 1 };
};

export const createPost = async (data: PostCreateRequest) => {
  const response = await client.post<PostCreateResponse>('/api/v1/posts', data);
  return response.data;
};
