import { useRecoilValue } from 'recoil';
import { userState } from '../app/atoms/userState';
import Write from '../app/components/write/Write';

function WritePage() {
  const user = useRecoilValue(userState);

  if (!user) return <>로그인요청컴포넌트</>;

  return <Write />;
}

export default WritePage;
