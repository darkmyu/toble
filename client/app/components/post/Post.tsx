import styled from '@emotion/styled';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { getPostList } from '../../lib/api/post';
import { useIntersect } from '../../lib/hooks/useIntersect';
import PostCardGrid from './PostCardGrid';

function Post() {
  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery(
    ['getPostList'],
    ({ pageParam = 1 }) => getPostList(pageParam, 20),
    {
      getNextPageParam: data => (!data.isLast ? data.nextPage : undefined),
    }
  );

  const posts = useMemo(() => (data ? data.pages.flatMap(({ items }) => items) : []), [data]);

  const ref = useIntersect(async (entry, observer) => {
    observer.unobserve(entry.target);

    if (hasNextPage && !isFetching) {
      await fetchNextPage();
    }
  });

  if (!data) return null;

  return (
    <Main>
      <PostCardGrid posts={posts} />
      <Target ref={ref} />
    </Main>
  );
}

const Main = styled.main`
  margin-top: 1rem;
`;

const Target = styled.div`
  height: 1px;
`;

export default Post;
