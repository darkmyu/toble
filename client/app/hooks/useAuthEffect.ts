import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { userState } from '../atoms/userState';
import { getUser } from './../lib/api/authApi';

export default function useAuthEffect() {
  const setUser = useSetRecoilState(userState);
  const { data, isLoading } = useQuery(['user'], () => getUser());

  useEffect(() => {
    if (!isLoading) {
      setUser(data || null);
    }
  }, [data, isLoading, setUser]);
}
