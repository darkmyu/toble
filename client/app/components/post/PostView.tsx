import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { getPost } from '../../lib/api/post';
import { ResponsiveParent } from '../../lib/styles/media';
import CommentList from './comment/CommentList';
import PostViewContent from './PostViewContent';
import PostViewHeader from './PostViewHeader';

function PostView() {
  const router = useRouter();
  const id = parseInt(router.query.id as string, 10);
  const { data } = useQuery(['getPost', id], () => getPost(id), { enabled: !isNaN(id) });

  if (!data) return <></>;

  const { post, comments } = data;

  return (
    <Wrapper>
      <Responsive>
        <PostViewHeader post={post} />
        <PostViewContent content={post.content} />
        <CommentList comments={comments} commentsCount={post.commentsCount} />
      </Responsive>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin-top: 4rem;
  margin-bottom: 4rem;
`;

const Responsive = styled(ResponsiveParent)`
  max-width: 768px;
`;

export default PostView;
