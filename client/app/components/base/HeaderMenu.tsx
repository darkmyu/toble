import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useSetRecoilState } from 'recoil';
import { userState } from '../../atoms/userState';
import { logoutUser } from '../../lib/api/authApi';
import HeaderMenuItem from './HeaderMenuItem';

interface Props {
  display: boolean;
  username: string;
}

function HeaderMenu({ display, username }: Props) {
  const router = useRouter();
  const setUser = useSetRecoilState(userState);

  const onClickLogout = () => {
    logoutUser().then(() => {
      setUser(null);
      router.push('/');
    });
  };

  return (
    <>
      {display && (
        <Wrapper>
          <HeaderMenuItem href={`/@${username}`}>내 블로그</HeaderMenuItem>
          <HeaderMenuItem onClickLogout={onClickLogout}>로그아웃</HeaderMenuItem>
        </Wrapper>
      )}
    </>
  );
}

const Wrapper = styled.div`
  position: absolute;
  top: 100%;
  right: 0px;
  margin-top: 1rem;
  border-radius: 10px;
  background: white;
  box-shadow: 1px 3px 10px rgba(0, 0, 0, 0.2);
  width: 12rem;
`;

export default HeaderMenu;
