import styled from '@emotion/styled';
import { black } from '../../lib/styles/palette';

export default function Header() {
  return (
    <Block>
      <Responsive>
        <Logo>Toble</Logo>
        <Right>회원가입 / 로그인</Right>
      </Responsive>
    </Block>
  );
}

const Block = styled.div`
  height: 4rem;
`;

const Responsive = styled.div`
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1160px;
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
