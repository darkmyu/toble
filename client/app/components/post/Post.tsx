import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import { getPostList } from '../../lib/api/post';
import PostCardGrid from './PostCardGrid';

function Post() {
  const { data: posts } = useQuery(['getPostList'], () => getPostList());

  if (!posts) return null;

  return (
    <Main>
      <PostCardGrid posts={posts} />
    </Main>
  );
}

const Main = styled.main`
  margin-top: 0.625rem;
`;

export default Post;
