import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { authModalState } from '../../atoms/authModalState';
import { blogModalState } from '../../atoms/blogModalState';
import { userState } from '../../atoms/userState';
import { ResponsiveParent } from '../../lib/styles/media';
import { black } from '../../lib/styles/palette';

function Header() {
  const setAuthActive = useSetRecoilState(authModalState);
  const setBlogActive = useSetRecoilState(blogModalState);
  const user = useRecoilValue(userState);
  const router = useRouter();

  const onClickBlogButton = () => {
    if (!user?.username) {
      setBlogActive(true);
    } else {
      router.push(`/${user?.username}`);
    }
  };

  return (
    <Block>
      <Responsive>
        <Logo onClick={() => router.push('/')}>Toble</Logo>
        {user ? (
          <Right onClick={onClickBlogButton}>내 블로그</Right>
        ) : (
          <Right onClick={() => setAuthActive(true)}>회원가입 / 로그인</Right>
        )}
      </Responsive>
    </Block>
  );
}

const Block = styled.header`
  height: 4rem;
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

export default Header;
