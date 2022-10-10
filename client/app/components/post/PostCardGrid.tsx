import styled from '@emotion/styled';
import { Post } from '../../lib/api/types';
import { media, ResponsiveParent } from '../../lib/styles/media';
import PostCard from './PostCard';

interface Props {
  posts: Post[];
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
  grid-template-columns: repeat(4, 1fr);

  ${media.main} {
    grid-template-columns: repeat(3, 1fr);
  }

  ${media.tablet} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${media.mobile} {
    grid-template-columns: repeat(1, 1fr);
  }
`;

export default PostCardGrid;
