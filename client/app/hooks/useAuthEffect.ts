import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { userState } from '../atoms/userState';
import getUser from '../lib/api/auth/getUser';
import userStorage from '../lib/userStorage';

export default function useAuthEffect() {
  const [query, setQuery] = useState(false);
  const [user, setUser] = useRecoilState(userState);
  const { data, isLoading } = useQuery(['user'], getUser, { enabled: query, retry: false });

  useEffect(() => {
    setQuery(true);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      setQuery(false);
    }
  }, [isLoading]);

  useEffect(() => {
    if (!isLoading) {
      if (user !== data) {
        userStorage.set(data);
        setUser(data);
      }
    }
  }, [data, isLoading, setUser, user]);
}
