import client from './client';

export const getUser = async () => {
  const response = await client.get('/api/v1/auth/profile');
  return response.data;
};

export const logoutUser = async () => {
  await client.post('/api/v1/auth/logout');
};
