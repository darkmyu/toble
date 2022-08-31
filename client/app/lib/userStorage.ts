import { User } from '../atoms/userState';

const key = 'USER';

const userStorage = {
  get() {
    if (typeof window !== 'undefined') {
      const data = localStorage.getItem(key);
      try {
        if (!data) return null;
        const parsed = JSON.parse(data) as User;
        return parsed;
      } catch (e) {
        localStorage.removeItem(key);
        return null;
      }
    }
  },
  set(user: User | undefined | null) {
    localStorage.setItem(key, JSON.stringify(user));
  },
  clear() {
    localStorage.removeItem(key);
  },
};

export default userStorage;
