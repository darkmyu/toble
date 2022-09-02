import client from '../client';

export default async function getUser() {
  const response = await client.get('/api/v1/auth/profile');
  return response.data;
}
