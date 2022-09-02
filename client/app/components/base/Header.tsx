import styled from '@emotion/styled';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { modalState } from '../../atoms/modalState';
import { userState } from '../../atoms/userState';
import { black } from '../../lib/styles/palette';

function Header() {
  const setActive = useSetRecoilState(modalState);
  const user = useRecoilValue(userState);

  return (
    <Block>
      <Responsive>
        <Logo>Toble</Logo>
        {user ? <Right>내 정보</Right> : <Right onClick={() => setActive(true)}>회원가입 / 로그인</Right>}
      </Responsive>
    </Block>
  );
}

const Block = styled.header`
  height: 4rem;
`;

const Responsive = styled.div`
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1140px;
  margin-left: auto;
  margin-right: auto;
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

export default Header;
