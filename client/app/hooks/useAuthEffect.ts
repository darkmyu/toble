import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { User, userState } from '../atoms/userState';
import getUser from '../lib/api/auth/getUser';

export default function useAuthEffect() {
  const [query, setQuery] = useState(true);
  const setUser = useSetRecoilState(userState);
  const { data, isLoading } = useQuery<User>(['user'], getUser, { enabled: query, retry: false });

  useEffect(() => {
    if (!isLoading) {
      setQuery(false);
      setUser(data);
    }
  }, [data, isLoading, setUser]);
}
