import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { userState } from '../atoms/userState';
import getUser from '../lib/api/auth/getUser';
import userStorage from '../lib/userStorage';

export default function useAuthEffect() {
  const router = useRouter();
  const [query, setQuery] = useState(false);
  const setUser = useSetRecoilState(userState);
  const { data, isLoading, error } = useQuery(['user'], getUser, { enabled: query });

  useEffect(() => {
    if (router.query.social) {
      setQuery(true);

      if (!isLoading) {
        setUser(data);
        userStorage.set(data);
        router.push('/');
      }
    }

    const tempUser = userStorage.get();
    if (!tempUser) return;

    setUser(tempUser);
  }, [data, isLoading, router, setUser]);
}
