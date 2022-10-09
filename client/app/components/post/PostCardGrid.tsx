import styled from '@emotion/styled';
import { PostListResponse } from '../../lib/api/types';
import { media, ResponsiveParent } from '../../lib/styles/media';
import PostCard from './PostCard';

interface Props {
  posts: PostListResponse[];
}

function PostCardGrid({ posts }: Props) {
  return (
    <Responsive>
      <Flex>
        {posts.map(post => (
          <PostCard post={post} key={post.id} />
        ))}
      </Flex>
    </Responsive>
  );
}

const Responsive = styled(ResponsiveParent)``;

const Flex = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0px -0.625rem;

  ${media.mobile} {
    margin: 0px;
  }
`;

export default PostCardGrid;
