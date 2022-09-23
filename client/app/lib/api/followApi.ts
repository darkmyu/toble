import client from './client';

export const createFollow = async (followingId: number) => {
  return client.post('/api/v1/follows', { followingId });
};

export const deleteFollow = async (followingId: number) => {
  return client.delete(`/api/v1/follows/${followingId}`);
};

export const checkFollow = async (followingId: number) => {
  const { data } = await client.post<boolean>('/api/v1/follows/check', { followingId });
  return data;
};
