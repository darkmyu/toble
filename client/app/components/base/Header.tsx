import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { authModalState } from '../../atoms/authModalState';
import { userState } from '../../atoms/userState';
import { ResponsiveParent } from '../../lib/styles/media';
import { black } from '../../lib/styles/palette';
import HeaderAvatar from './HeaderAvatar';
import HeaderMenu from './HeaderMenu';

function Header() {
  const setAuthActive = useSetRecoilState(authModalState);
  const user = useRecoilValue(userState);
  const router = useRouter();
  const [display, setDisplay] = useState(false);

  const onClickDropdown = () => {
    setDisplay(!display);
  };

  return (
    <Block>
      <Responsive>
        <Logo onClick={() => router.push('/')}>Toble</Logo>
        {user ? (
          <Wrapper>
            <HeaderAvatar
              profileImageUrl={user.profileImageUrl}
              onClickDropdown={onClickDropdown}
            />
            <HeaderMenu
              display={display}
              username={user.username}
              onClickDropdown={onClickDropdown}
            />
          </Wrapper>
        ) : (
          <Right onClick={() => setAuthActive(true)}>회원가입 / 로그인</Right>
        )}
      </Responsive>
    </Block>
  );
}

const Block = styled.header`
  height: 4rem;
  background: white;
`;

const Responsive = styled(ResponsiveParent)`
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
`;

const Logo = styled.div`
  font-size: 1.5rem;
  color: ${black[900]};
  cursor: pointer;
`;

const Right = styled.div`
  font-size: 0.875rem;
  color: ${black[800]};
  cursor: pointer;
`;

const Wrapper = styled.div`
  display: flex;
  position: relative;
`;

export default Header;
