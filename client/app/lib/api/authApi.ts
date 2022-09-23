import client from './client';
import { User } from './types';

export const getUser = async () => {
  const { data } = await client.get<User>('/api/v1/auth/profile');
  return data;
};

export const logoutUser = async () => {
  await client.post('/api/v1/auth/logout');
};
