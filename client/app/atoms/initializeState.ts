import { MutableSnapshot } from 'recoil';
import userStorage from '../lib/userStorage';
import { userState } from './userState';

export default function initializeState({ set }: MutableSnapshot) {
  const user = userStorage.get();

  if (user) {
    set(userState, user);
  }
}
