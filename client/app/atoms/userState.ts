import { atom } from 'recoil';

export interface User {
  id: number;
  username: string;
  shortWord: string;
  profileImageUrl: string;
  email: string;
}

export const userState = atom<User | null | undefined>({
  key: 'userState',
  default: null,
});
