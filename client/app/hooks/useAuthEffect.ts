import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { userState } from '../atoms/userState';
import getUser from '../lib/api/auth/getUser';

export default function useAuthEffect() {
  const [query, setQuery] = useState(false);
  const setUser = useSetRecoilState(userState);
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
      setUser(data);
    }
  }, [data, isLoading, setUser]);
}
