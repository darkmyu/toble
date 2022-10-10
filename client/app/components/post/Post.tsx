import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import { getPostList } from '../../lib/api/post';
import PostCardGrid from './PostCardGrid';

function Post() {
  const { data } = useQuery(['getPostList'], () => getPostList());

  if (!data) return null;

  return (
    <Main>
      <PostCardGrid posts={data.posts} />
    </Main>
  );
}

const Main = styled.main`
  margin-top: 1rem;
`;

export default Post;
