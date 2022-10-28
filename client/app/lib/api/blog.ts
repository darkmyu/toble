import client from './client';
import { Blog, BlogCreateRequest, Topic } from './types';

export const createBlog = async (data: BlogCreateRequest) => {
  return client.post('/api/v1/blogs', data);
};

export const getBlog = async (username: string) => {
  const { data } = await client.get<Blog>(`/api/v1/blogs/${username}`);
  return data;
};

export const getTopics = async () => {
  const { data } = await client.get<Topic[]>('/api/v1/topics');
  return data;
};
