import { BlogModalInputs } from '../../components/blog/hooks/useBlogModal';
import client from './client';

export const createBlog = (data: BlogModalInputs) => {
  return client.post('/api/v1/blogs', data);
};
