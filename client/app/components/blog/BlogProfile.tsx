import styled from '@emotion/styled';
import Image from 'next/image';
import Link from 'next/link';
import { Blog } from '../../lib/api/types';
import { ResponsiveParent } from '../../lib/styles/media';
import { black } from '../../lib/styles/palette';
import { formatNumber } from '../../lib/utils';

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
            <Title>{title}</Title>
            <Wrapper>
              <Block>
                <Count>{formatNumber(favoritesCount)}</Count>
                <Text>팔로우 중</Text>
              </Block>
              <Block>
                <Count>{formatNumber(followersCount)}</Count>
                <Text>팔로워</Text>
              </Block>
            </Wrapper>
            {shortWord && <ShortWord>{shortWord}</ShortWord>}
          </Description>
        </Profile>
        <StyledHr />
      </Responsive>
    </Section>
  );
}

const Section = styled.section``;

const Responsive = styled(ResponsiveParent)``;

const Profile = styled.div`
  display: flex;
  align-items: center;

  a {
    flex: 0 0 auto;
    padding: 2rem;
  }

  img {
    border-radius: 50%;
  }
`;

const Description = styled.div`
  flex: 1 1 auto;
  min-width: 0;
  margin-left: 4rem;
  margin-right: 2rem;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 1.5rem;
  color: ${black[800]};
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

const ShortWord = styled.h3`
  margin: 0;
  font-size: 0.875rem;
  color: ${black[700]};
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

const Wrapper = styled.div`
  display: flex;
  padding-top: 0.75rem;
  padding-bottom: 1.75rem;
  font-weight: bold;
  font-size: 0.875rem;
`;

const Block = styled.div`
  &:nth-child(1) {
    margin-right: 1rem;
  }
`;

const Count = styled.span`
  color: ${black[700]};
  margin-right: 0.125rem;
`;

const Text = styled.span`
  color: ${black[500]};
`;

const StyledHr = styled.hr`
  margin: 0;
  border: 1px solid ${black[100]};
`;

export default BlogProfile;
