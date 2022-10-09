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
      <Grid>
        {posts.map(post => (
          <PostCard post={post} key={post.id} />
        ))}
      </Grid>
    </Responsive>
  );
}

const Responsive = styled(ResponsiveParent)``;

const Grid = styled.div`
  display: grid;
  gap: 2rem 1.25rem;
  grid-template-columns: repeat(4, calc((100% - 60px) / 4));

  ${media.main} {
    grid-template-columns: repeat(3, calc((100% - 40px) / 3));
  }

  ${media.tablet} {
    grid-template-columns: repeat(2, calc((100% - 20px) / 2));
  }

  ${media.mobile} {
    grid-template-columns: 100%;
  }
`;

export default PostCardGrid;
