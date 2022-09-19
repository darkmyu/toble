import styled from '@emotion/styled';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { userState } from '../../atoms/userState';
import { logoutUser } from '../../lib/api/authApi';
import { Blog } from '../../lib/api/types';
import { ResponsiveParent } from '../../lib/styles/media';
import { black } from '../../lib/styles/palette';
import BlogProfileFollow from './BlogProfileFollow';

interface Props {
  blog: Blog;
}

function BlogProfile({ blog }: Props) {
  const router = useRouter();
  const [me, setMe] = useState(false);
  const [user, setUser] = useRecoilState(userState);
  const { profileImageUrl, title, shortWord, username, favoritesCount, followersCount } = blog;

  useEffect(() => {
    user?.username === blog.username ? setMe(true) : setMe(false);
  }, [blog, user]);

  const onClickLogout = () => {
    logoutUser().then(() => {
      setUser(null);
      router.push('/');
    });
  };

  return (
    <Section>
      <Responsive>
        <Profile>
          <Link href={`/@${username}`}>
            <a>
              {profileImageUrl && (
                <Image src={profileImageUrl} width={140} height={140} alt='profile' />
              )}
            </a>
          </Link>
          <Description>
            <Flex>
              <Title>{title.length > 25 ? `${title.substring(0, 25)} ...` : title}</Title>
              <div>Icons Component</div>
            </Flex>
            <BlogProfileFollow favoritesCount={favoritesCount} followersCount={followersCount} />
            <Flex>
              <ShortWord>{shortWord ? shortWord : ''}</ShortWord>
              {me && <LogoutButton onClick={onClickLogout}>로그아웃</LogoutButton>}
            </Flex>
          </Description>
        </Profile>
      </Responsive>
    </Section>
  );
}

const Section = styled.section``;

const Responsive = styled(ResponsiveParent)``;

const Profile = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;

  a {
    max-width: auto;
    padding: 2rem;
  }

  img {
    border-radius: 50%;
  }
`;

const Description = styled.div`
  flex: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;
  margin-left: 4rem;
  margin-right: 2rem;
`;

const Flex = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 1.5rem;
  color: ${black[800]};
`;

const ShortWord = styled.h3`
  margin: 0;
  font-size: 0.875rem;
  color: ${black[700]};
`;

const LogoutButton = styled.button`
  background: none;
  border: none;
  font-size: 0.875rem;
  font-weight: bold;
  color: #d65d5d;
  cursor: pointer;
`;

export default BlogProfile;
