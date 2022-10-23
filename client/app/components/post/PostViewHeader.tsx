import styled from '@emotion/styled';
import Image from 'next/image';
import Link from 'next/link';
import { Post } from '../../lib/api/types';
import { black } from '../../lib/styles/palette';
import { formatDate } from '../../lib/utils';
import BookmarkIconButton from '../icon/BookmarkIconButton';
import { CopyLink, Dot } from '../icon/vector';

interface Props {
  post: Post;
}

function PostViewHeader({ post }: Props) {
  return (
    <Section>
      <Title>{post.title}</Title>
      <Box>
        <Profile>
          <Link href={`/@${post.user.username}`}>
            <Anchor>
              <Image
                src={post.user.profileImageUrl}
                width={42}
                height={42}
                objectFit='cover'
                alt=''
              />
            </Anchor>
          </Link>
          <Info>
            <DisplayName>{post.user.displayName}</DisplayName>
            <CreatedAt>{formatDate(post.createdAt)}</CreatedAt>
          </Info>
        </Profile>
        <Service>
          <BookmarkIconButton size={24} isActive={false} />
          <CopyLink />
          <Dot />
        </Service>
      </Box>
    </Section>
  );
}

const Section = styled.section`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  margin: 0;
  color: ${black[800]};
`;

const Box = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
`;

const Profile = styled.div`
  display: flex;
  align-items: center;
  gap: 0.875rem;
`;

const Anchor = styled.a`
  display: flex;
  align-items: center;

  img {
    border-radius: 50%;
  }
`;

const Info = styled.div`
  height: 100%;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  font-weight: bold;
`;

const DisplayName = styled.span`
  color: ${black[800]};
  font-size: 0.875rem;
`;

const CreatedAt = styled.span`
  color: ${black[500]};
  font-size: 0.75rem;
`;

const Service = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  svg {
    color: ${black[500]};
    cursor: pointer;
  }
`;

export default PostViewHeader;
