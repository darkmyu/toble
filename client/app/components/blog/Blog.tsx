import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import BlogProfile from './BlogProfile';
import { useBlog } from './hooks/useBlog';

function Blog() {
  const router = useRouter();
  const username = router.query.username as string;
  const { blog, error, me } = useBlog(username);

  if (error) return <>Not found Blog</>;

  return (
    <Block>
      <BlogProfile blog={blog} me={me} />
    </Block>
  );
}

const Block = styled.main`
  padding-top: 10rem;
`;

export default Blog;
