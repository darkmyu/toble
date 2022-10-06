import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { userState } from '../atoms/userState';

function useAuthCheckEffect() {
  const router = useRouter();
  const user = useRecoilValue(userState);

  useEffect(() => {
    if (!user) router.push('/login');
  }, [router, user]);
}

export default useAuthCheckEffect;
