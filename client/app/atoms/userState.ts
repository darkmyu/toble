import { atom } from 'recoil';
import { User } from '../lib/api/types';

export const userState = atom<User | null>({
  key: 'userState',
  default: null,
});
