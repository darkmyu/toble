import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { getPost } from '../../lib/api/post';
import { ResponsiveParent } from '../../lib/styles/media';
import PostViewContent from './PostViewContent';
import PostViewHeader from './PostViewHeader';

function PostView() {
  const router = useRouter();
  const id = parseInt(router.query.id as string, 10);
  const { data: post } = useQuery(['getPost', id], () => getPost(id), { enabled: !isNaN(id) });

  if (!post) return <>*Add page is not found component</>;

  return (
    <Main>
      <Responsive>
        <PostViewHeader post={post} />
        <PostViewContent content={post.content} />
      </Responsive>
    </Main>
  );
}

const Main = styled.main`
  margin-top: 9rem;
`;

const Responsive = styled(ResponsiveParent)`
  max-width: 768px;
`;

export default PostView;
