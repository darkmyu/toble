import { User } from '../../../atoms/userState';
import client from '../client';

export default async function getUser() {
  const response = await client.get<User>('/api/v1/auth/profile');
  return response.data;
}
