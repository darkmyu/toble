import { BlogModalInputs } from '../../components/blog/hooks/useBlogModal';
import client from './client';
import { Blog } from './types';

export const createBlog = async (data: BlogModalInputs) => {
  return client.post('/api/v1/blogs', data);
};

export const getBlog = async (username: string) => {
  const { data } = await client.get<Blog>(`/api/v1/blogs/${username}`);
  return data;
};
