import styled from '@emotion/styled';
import Image from 'next/image';
import Link from 'next/link';
import { Blog } from '../../lib/api/types';
import { ResponsiveParent } from '../../lib/styles/media';
import { black } from '../../lib/styles/palette';
import BlogProfileFollow from './BlogProfileFollow';

interface Props {
  blog: Blog;
}

function BlogProfile({ blog }: Props) {
  const { profileImageUrl, title, shortWord, username, favoritesCount, followersCount } = blog;

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
            <Title>
              {title.substring(0, 30)}
              {title.length > 30 && ' ...'}
            </Title>
            <BlogProfileFollow favoritesCount={favoritesCount} followersCount={followersCount} />
            <ShortWord>{shortWord}</ShortWord>
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

export default BlogProfile;
