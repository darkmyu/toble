import styled from '@emotion/styled';
import Image from 'next/image';
import Link from 'next/link';
import CommentIcon from '../../assets/comment.svg';
import LikeIcon from '../../assets/like.svg';
import { PostListResponse } from '../../lib/api/types';
import { media } from '../../lib/styles/media';
import { black } from '../../lib/styles/palette';
import { formatDate, formatNumber } from '../../lib/utils';

interface Props {
  post: PostListResponse;
}

function PostCard({ post }: Props) {
  return (
    <Box>
      <Link href={`/@${post.user.username}/${post.id}`}>
        <StyledAnchor>
          <Thumbnail>
            <Image
              src='https://cdn.pixabay.com/photo/2022/09/21/02/35/white-faced-heron-7469269_1280.jpg'
              layout='fill'
              objectFit='cover'
              alt=''
            />
          </Thumbnail>
          <Content>
            <Title>{post.title}</Title>
            <Date>{formatDate(post.createdAt)}</Date>
            <DescriptionWrapper>
              <Description>{post.description}</Description>
            </DescriptionWrapper>
          </Content>
        </StyledAnchor>
      </Link>
      <Footer>
        <Link href={`/@${post.user.username}`}>
          <Anchor>
            <Image
              src={post.user.profileImageUrl}
              width={24}
              height={24}
              objectFit='cover'
              alt=''
            />
            <DisplayName>{post.user.displayName}</DisplayName>
          </Anchor>
        </Link>
        <State>
          <StateBlock>
            <CommentIcon />
            {formatNumber(post.commentsCount)}
          </StateBlock>
          <StateBlock>
            <LikeIcon />
            {formatNumber(post.likes)}
          </StateBlock>
        </State>
      </Footer>
    </Box>
  );
}

const Box = styled.div`
  width: 270px;
  display: flex;
  flex-direction: column;
  margin: 1rem 0.625rem;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 0.625rem;

  ${media.tablet} {
    width: calc(50% - 1.25rem);
  }

  ${media.mobile} {
    width: calc(100% - 1.25rem);
  }
`;

const StyledAnchor = styled.a`
  text-decoration: none;
`;

const Thumbnail = styled.div`
  position: relative;
  padding-top: 70%;
  cursor: pointer;

  img {
    height: 100%;
    position: absolute;
    border-radius: 0.625rem;
  }
`;

const Content = styled.div`
  padding: 1rem;
  padding-bottom: 2rem;
  cursor: pointer;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 1rem;
  color: ${black[800]};
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

const Date = styled.div`
  font-size: 0.75rem;
  font-weight: bold;
  color: ${black[500]};
  margin-top: 0.375rem;
`;

const DescriptionWrapper = styled.div`
  margin-top: 1.5rem;
`;

const Description = styled.p`
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  overflow: hidden;
  margin: 0;
  font-size: 0.875rem;
  font-weight: bold;
  color: ${black[500]};
  height: 3.1875rem;
`;

const Footer = styled.div`
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Anchor = styled.a`
  display: flex;
  align-items: center;
  cursor: pointer;

  img {
    border-radius: 50%;
  }
`;

const DisplayName = styled.span`
  color: ${black[500]};
  font-weight: bold;
  font-size: 0.75rem;
  margin-left: 0.5rem;
`;

const State = styled.div`
  display: flex;
  font-weight: bold;
  font-size: 0.75rem;
  color: ${black[500]};

  div:nth-of-type(1) {
    margin-right: 1rem;
  }
`;

const StateBlock = styled.div`
  display: flex;
  align-items: center;

  svg {
    margin-right: 0.375rem;
  }
`;

export default PostCard;
