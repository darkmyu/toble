import client from './client';

export const getBlog = async (username: string) => client.get(`/api/v1/blogs/${username}`);
